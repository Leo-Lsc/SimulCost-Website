/**
 * SimulCost Website Configuration
 *
 * This file contains all user-customizable content for the website.
 * Update the values below to personalize your project page.
 */

// Site metadata
export const siteTitle = "SimulCost";
export const siteSubtitle = "A Cost-Aware Benchmark for Automating Physics Simulations with LLMs";

// Authors and affiliations
export const authors = [
	{ name: "Author A", affiliation: "UC San Diego" },
	{ name: "Author B", affiliation: "UC San Diego" },
	{ name: "Author C", affiliation: "UC San Diego" },
];

// External links (replace '#' with actual URLs)
export const links = {
	paper: "#",
	code: "#",
	dataset: "#",
	cacheBaseline: "#",
	cacheFull: "#",
};

// Navigation items
export const navItems = [
	{ label: "About", href: "#about", sectionTitle: "Abstract" },
	{ label: "Simulators", href: "#simulators", sectionTitle: "Simulators Covered" },
	{ label: "Results", href: "#results", sectionTitle: "Main Results" },
	{ label: "Findings", href: "#findings", sectionTitle: "Key Findings" },
	{ label: "Conclusions", href: "#conclusions", sectionTitle: "Conclusions" },
	{ label: "Citation", href: "#citation", sectionTitle: "Citation" },
];

// Section content (placeholder text - replace with actual content)
export const sections = {
	abstract: `SimulCost is a comprehensive benchmark designed to evaluate the performance and cost-effectiveness of Large Language Models (LLMs) in automating physics simulations. This research addresses the critical need for understanding both the capabilities and economic implications of using LLMs for scientific computing tasks.

Our benchmark covers a diverse range of physics simulation environments, from classical mechanics to computational fluid dynamics, providing a holistic assessment of LLM performance across different domains and complexity levels.`,

	simulators: `Our benchmark encompasses a carefully curated selection of physics simulation environments that represent diverse computational challenges and domain-specific requirements. These simulators span multiple physics domains including:

- Classical mechanics and rigid body dynamics
- Fluid dynamics and computational fluid dynamics (CFD)
- Electromagnetic simulations
- Particle physics and molecular dynamics
- Thermal and heat transfer simulations

Each simulator has been selected to test different aspects of LLM reasoning, code generation, and parameter optimization capabilities.`,

	results: `The evaluation results demonstrate significant insights into LLM performance across different simulation tasks. Key metrics include:

- Success rate in generating valid simulation code
- Accuracy of simulation outputs compared to ground truth
- Computational cost and API usage
- Time to solution across different model sizes

Our findings reveal substantial variation in performance across different simulation types, with certain domains proving more challenging for current LLMs than others. The cost-aware analysis provides crucial insights for practitioners considering LLM adoption for scientific computing workflows.`,

	findings: `Through extensive experimentation, we have identified several critical insights:

1. **Task Complexity Matters**: Performance varies significantly based on simulation complexity, with simpler tasks showing near-perfect accuracy while complex multi-physics simulations remain challenging.

2. **Cost-Performance Trade-offs**: Larger models do not always justify their higher cost, particularly for well-defined simulation tasks where smaller models achieve comparable accuracy.

3. **Domain-Specific Patterns**: Certain physics domains (e.g., classical mechanics) are more amenable to LLM automation than others (e.g., turbulent flow simulations).

4. **Prompt Engineering Impact**: Careful prompt design significantly affects both success rate and cost, with structured prompts outperforming free-form instructions.

These findings provide actionable guidance for researchers and practitioners working at the intersection of AI and scientific computing.`,

	conclusions: `SimulCost establishes a foundational benchmark for evaluating LLMs in physics simulation automation, providing both performance metrics and cost awareness that are essential for practical deployment.

Our work demonstrates that while current LLMs show promise in automating certain classes of physics simulations, significant challenges remain in handling complex, multi-physics scenarios. The cost-aware perspective introduced by SimulCost is crucial for making informed decisions about LLM adoption in scientific workflows.

Future work should focus on developing specialized models for scientific computing, improving few-shot learning capabilities, and reducing computational costs while maintaining accuracy. We hope SimulCost will serve as a valuable resource for the community to track progress and identify areas for improvement.`,
};

// Citation (replace with actual BibTeX)
export const citation = `@inproceedings{simulcost2026,
  title     = {SimulCost: A Cost-Aware Benchmark for Automating Physics Simulations with LLMs},
  author    = {Author A and Author B and Author C},
  booktitle = {TBD},
  year      = {2026}
}`;

// Footer content (exact three lines as specified)
export const footerLines = [
	"We are grateful to our supporters.",
	"© 2026. UCSD Rose Spatiotemporal Machine Learning Lab.",
	"Designed by Sicheng Leo Lai.",
];

/**
 * Color Palette Options
 *
 * Current: Palette A (Indigo Slate + Cyan Accent)
 *
 * To switch palettes, update tailwind.config.mjs with the color values below:
 *
 * Palette A (Current - Indigo Slate + Cyan):
 * - Background: #0B1020
 * - Surface: #111A33
 * - Text Primary: #EAF0FF
 * - Text Secondary: #A9B4D0
 * - Border: #243055
 * - Accent Cyan: #22D3EE
 * - Accent Indigo: #6366F1
 * Style: High-end, tech-focused, strong academic feel
 *
 * Palette B (Warm Neutral + Rose):
 * - Background: #0F0F10
 * - Surface: #17171A
 * - Text Primary: #F5F5F7
 * - Text Secondary: #B4B4BE
 * - Accent Rose: #FB7185
 * - Accent Amber: #FBBF24
 * Style: Warmer, more presentational
 *
 * Palette C (Light Academic + Blue):
 * - Background: #F7FAFF
 * - Surface: #FFFFFF
 * - Text Primary: #0B1220
 * - Text Secondary: #445069
 * - Border: #E6ECF5
 * - Accent Blue: #2563EB
 * - Accent Teal: #14B8A6
 * Style: Clean, paper-reading aesthetic
 */
