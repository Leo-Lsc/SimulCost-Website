/**
 * Scrollspy - Highlights active navigation item based on scroll position
 *
 * Uses native browser anchor navigation (CSS scroll-behavior: smooth) to
 * avoid race conditions. Tracks all intersecting sections and highlights
 * only the bottom-most one to guarantee a single active nav link.
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
});
