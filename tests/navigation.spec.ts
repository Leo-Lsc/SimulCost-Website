import { test, expect, Page } from '@playwright/test';

/** Wait until no scroll events fire for `ms` milliseconds. */
async function waitForScrollIdle(page: Page, ms = 500) {
	await page.evaluate((timeout) => {
		return new Promise<void>((resolve) => {
			let timer: ReturnType<typeof setTimeout>;
			const onScroll = () => {
				clearTimeout(timer);
				timer = setTimeout(() => {
					window.removeEventListener('scroll', onScroll);
					resolve();
				}, timeout);
			};
			window.addEventListener('scroll', onScroll);
			// Kick off the timer in case scroll already finished
			timer = setTimeout(() => {
				window.removeEventListener('scroll', onScroll);
				resolve();
			}, timeout);
		});
	}, ms);
}

const navSections = [
	{ label: 'About', id: 'about' },
	{ label: 'Methodology', id: 'simulators' },
	{ label: 'Results', id: 'results' },
	{ label: 'Findings', id: 'findings' },
	{ label: 'Takeaways', id: 'takeaways' },
	{ label: 'Future', id: 'future' },
	{ label: 'Conclusions', id: 'conclusions' },
	{ label: 'Citation', id: 'citation' },
];

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
		// Wait for images to reserve space (layout-stable)
		await page.waitForLoadState('domcontentloaded');
	});

	for (const { label, id } of navSections) {
		test(`click "${label}" → scrolls to #${id} and highlights only "${label}"`, async ({ page }) => {
			const link = page.locator(`.nav-link[data-section="${id}"]`).first();
			await link.click();
			await waitForScrollIdle(page);

			// Target section should be near viewport top (within 200px)
			const sectionTop = await page.locator(`section#${id}`).evaluate((el) => {
				return el.getBoundingClientRect().top;
			});
			expect(sectionTop).toBeLessThan(200);

			// Exactly one active nav link
			const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
			await expect(activeLinks).toHaveCount(1);
			await expect(activeLinks.first()).toHaveAttribute('data-section', id);
		});
	}

	test('rapid click: Takeaways → Methodology → only "Methodology" active', async ({ page }) => {
		await page.locator('.nav-link[data-section="takeaways"]').first().click();
		await page.waitForTimeout(50);
		await page.locator('.nav-link[data-section="simulators"]').first().click();
		await waitForScrollIdle(page);

		const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
		await expect(activeLinks).toHaveCount(1);
		await expect(activeLinks.first()).toHaveAttribute('data-section', 'simulators');
	});

	test('rapid click: Citation → About → only "About" active', async ({ page }) => {
		await page.locator('.nav-link[data-section="citation"]').first().click();
		await page.waitForTimeout(50);
		await page.locator('.nav-link[data-section="about"]').first().click();
		await waitForScrollIdle(page);

		const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
		await expect(activeLinks).toHaveCount(1);
		await expect(activeLinks.first()).toHaveAttribute('data-section', 'about');
	});

	test('rapid click: About → Citation → only "Citation" active', async ({ page }) => {
		await page.locator('.nav-link[data-section="about"]').first().click();
		await page.waitForTimeout(50);
		await page.locator('.nav-link[data-section="citation"]').first().click();
		await waitForScrollIdle(page);

		const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
		await expect(activeLinks).toHaveCount(1);
		await expect(activeLinks.first()).toHaveAttribute('data-section', 'citation');
	});

	test('triple rapid click: Results → Findings → Conclusions → only "Conclusions" active', async ({ page }) => {
		await page.locator('.nav-link[data-section="results"]').first().click();
		await page.waitForTimeout(30);
		await page.locator('.nav-link[data-section="findings"]').first().click();
		await page.waitForTimeout(30);
		await page.locator('.nav-link[data-section="conclusions"]').first().click();
		await waitForScrollIdle(page);

		const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
		await expect(activeLinks).toHaveCount(1);
		await expect(activeLinks.first()).toHaveAttribute('data-section', 'conclusions');
	});

	test('bottom of page: Citation highlights as Citation, not Conclusions', async ({ page }) => {
		await page.locator('.nav-link[data-section="citation"]').first().click();
		await waitForScrollIdle(page);

		const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
		await expect(activeLinks).toHaveCount(1);
		await expect(activeLinks.first()).toHaveAttribute('data-section', 'citation');
	});

	test('first-load scroll to Citation lands on Citation, not Takeaways', async ({ page }) => {
		// Fresh page load — immediately click Citation
		await page.goto('/');
		await page.waitForLoadState('domcontentloaded');

		await page.locator('.nav-link[data-section="citation"]').first().click();
		await waitForScrollIdle(page);

		// Citation section should be near top of viewport
		const sectionTop = await page.locator('section#citation').evaluate((el) => {
			return el.getBoundingClientRect().top;
		});
		expect(sectionTop).toBeLessThan(200);

		const activeLinks = page.locator('.nav-link.active:not(.mobile-nav-link)');
		await expect(activeLinks).toHaveCount(1);
		await expect(activeLinks.first()).toHaveAttribute('data-section', 'citation');
	});

	test('URL hash updates on nav click', async ({ page }) => {
		for (const { id } of navSections) {
			await page.locator(`.nav-link[data-section="${id}"]`).first().click();
			await waitForScrollIdle(page);

			const hash = await page.evaluate(() => location.hash);
			expect(hash).toBe(`#${id}`);
		}
	});
});
