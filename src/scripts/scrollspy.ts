/**
 * Scrollspy - Highlights active navigation item based on scroll position
 */

document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link[data-section]');

	if (sections.length === 0 || navLinks.length === 0) return;

	// Create intersection observer
	const observerOptions = {
		root: null,
		rootMargin: '-96px 0px -66%', // Account for navbar height and trigger earlier
		threshold: 0,
	};

	let activeSection: string | null = null;

	// Lock observer updates during programmatic scrolls to prevent
	// intermediate sections from hijacking the active highlight.
	let isScrollingFromClick = false;
	let scrollEndFallbackTimer: ReturnType<typeof setTimeout> | null = null;

	function unlockObserver() {
		isScrollingFromClick = false;
		if (scrollEndFallbackTimer !== null) {
			clearTimeout(scrollEndFallbackTimer);
			scrollEndFallbackTimer = null;
		}
	}

	const observer = new IntersectionObserver((entries) => {
		if (isScrollingFromClick) return;

		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				activeSection = entry.target.id;
				updateActiveNav(activeSection);
			}
		});
	}, observerOptions);

	// Observe all sections
	sections.forEach((section) => {
		observer.observe(section);
	});

	// Update active navigation link
	function updateActiveNav(sectionId: string) {
		navLinks.forEach((link) => {
			const linkSection = link.getAttribute('data-section');
			if (linkSection === sectionId) {
				link.classList.add('active');
			} else {
				link.classList.remove('active');
			}
		});
	}

	// Handle direct clicks (smooth scroll is handled by CSS)
	navLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			const href = link.getAttribute('href');
			if (href?.startsWith('#')) {
				e.preventDefault();
				const targetId = href.substring(1);
				const targetSection = document.getElementById(targetId);

				if (targetSection) {
					// Lock observer before starting the scroll
					isScrollingFromClick = true;

					// Clear any pending unlock from a previous rapid click
					if (scrollEndFallbackTimer !== null) {
						clearTimeout(scrollEndFallbackTimer);
					}

					// Update active state immediately
					updateActiveNav(targetId);

					// Smooth scroll to section
					targetSection.scrollIntoView({
						behavior: 'smooth',
						block: 'start',
					});

					// Update URL without scrolling
					history.replaceState(null, '', href);

					// Unlock observer when scroll finishes
					const onScrollEnd = () => {
						unlockObserver();
						window.removeEventListener('scrollend', onScrollEnd);
					};
					window.addEventListener('scrollend', onScrollEnd, { once: true });

					// Fallback: unlock after 1s for browsers without scrollend
					// or when the section is already in view (no scroll occurs)
					scrollEndFallbackTimer = setTimeout(() => {
						unlockObserver();
						window.removeEventListener('scrollend', onScrollEnd);
					}, 1000);
				}
			}
		});
	});
});
