/**
 * Scrollspy - Highlights active navigation item based on scroll position
 *
 * Uses a Set-based IntersectionObserver that tracks all intersecting sections
 * and highlights only the bottom-most one to guarantee a single active nav link.
 *
 * Click handler uses scrollIntoView() for reliable element targeting without
 * any scroll locking — the Set-based observer is self-correcting and always
 * converges to the correct active section when scrolling completes.
 */

document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link[data-section]');

	if (sections.length === 0 || navLinks.length === 0) return;

	const intersecting = new Set<string>();

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					intersecting.add(entry.target.id);
				} else {
					intersecting.delete(entry.target.id);
				}
			});

			// Pick the bottom-most intersecting section (last in DOM order)
			let activeId: string | null = null;
			sections.forEach((section) => {
				if (intersecting.has(section.id)) {
					activeId = section.id;
				}
			});

			navLinks.forEach((link) => {
				const linkSection = link.getAttribute('data-section');
				if (linkSection === activeId) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			});
		},
		{
			rootMargin: '-20% 0px -70% 0px',
			threshold: 0,
		}
	);

	sections.forEach((section) => observer.observe(section));

	// Click handler: scrollIntoView for reliable targeting, no locking needed
	navLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (!href || !href.startsWith('#')) return;

			e.preventDefault();

			const targetId = href.substring(1);
			const target = document.getElementById(targetId);
			if (!target) return;

			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', href);
		});
	});
});
