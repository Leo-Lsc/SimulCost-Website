/**
 * Scrollspy - Highlights active navigation item based on scroll position
 *
 * Uses native browser anchor navigation (no JavaScript scrolling) to avoid
 * race conditions with the IntersectionObserver. Each section independently
 * manages its own nav link active state.
 */

document.addEventListener('DOMContentLoaded', () => {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('.nav-link[data-section]');

	if (sections.length === 0 || navLinks.length === 0) return;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const id = entry.target.id;
				const links = document.querySelectorAll(`.nav-link[data-section="${id}"]`);
				links.forEach((link) => {
					if (entry.isIntersecting) {
						link.classList.add('active');
					} else {
						link.classList.remove('active');
					}
				});
			});
		},
		{
			rootMargin: '-20% 0px -70% 0px',
			threshold: 0,
		}
	);

	sections.forEach((section) => observer.observe(section));
});
