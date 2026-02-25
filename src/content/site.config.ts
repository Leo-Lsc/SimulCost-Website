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
	{ label: "Methodology", href: "#simulators", sectionTitle: "How does SimulCost work?" },
	{ label: "Results", href: "#results", sectionTitle: "Main Results" },
	{ label: "Findings", href: "#findings", sectionTitle: "Key Findings" },
	{ label: "Conclusions", href: "#conclusions", sectionTitle: "Conclusions" },
	{ label: "Citation", href: "#citation", sectionTitle: "Citation" },
];

// Section content (placeholder text - replace with actual content)
export const sections = {
	abstract: `SimulCost takes as input a physics simulation task with an accuracy requirement and evaluates how well an LLM can choose tunable parameters that <strong>balance solution quality and computational cost</strong>. First and foremost, SimulCost is a benchmark and toolkit for cost-aware evaluation, designed to help researchers and practitioners measure whether a model is not only correct, but also efficient. Instead of treating tool use as "free," SimulCost explicitly tracks simulation cost (primarily through platform-independent FLOP-based cost accounting) and evaluates both success rate and computational efficiency.

It provides a standardized testbed spanning <strong>12 simulators</strong>, <strong>3 domains</strong> (fluid dynamics, solid mechanics, and plasma physics), <strong>3 accuracy levels</strong>, and <strong>4,816 tasks</strong>, including both single-round (initial guess) and multi-round (trial-and-error) tuning settings. Beyond static benchmarking, SimulCost also includes an extensible toolkit with solver libraries and standardized interfaces, so you can reproduce results, compare methods (including scan and Bayesian optimization baselines), and build new simulation environments. SimulCost is not meant to replace domain expertise—it is meant to make cost-awareness measurable, comparable, and improvable for LLM-based scientific agents.`,

	simulators: `SimulCost organizes cost-aware evaluation into four components: dataset curation, solver playground/task construction, LLM inference, and evaluation. In curation, domain experts build or adapt solvers, generate reference solutions with scan-based search, create task variants under different accuracy requirements, and filter out invalid or infeasible cases. In the solver playground, each task asks the model to tune one cost-sensitive parameter while keeping other settings fixed, which makes comparisons controlled and reproducible. SimulCost measures simulation cost primarily with solver-specific FLOP accounting (with limited exceptions), rather than treating tool calls as free.

To test tuning behavior, SimulCost supports both single-round and multi-round inference. Single-round evaluates the model's one-shot parameter choice, while multi-round allows iterative trial-and-error with simulator feedback and accumulated cost tracking. Performance is then assessed with success rate and cost efficiency relative to a scan-based reference, and compared against baselines such as brute-force scanning and Bayesian optimization to reveal strengths, weaknesses, and opportunities for improvement.`,

	results: `SimulCost reveals a consistent gap between task success and cost-efficient tuning. In single-round mode, frontier LLMs achieve only moderate reliability (46–64% success overall), and performance drops markedly under stricter accuracy requirements. Multi-round interaction improves success substantially (roughly 71–80%), but most models still spend significantly more simulation budget than simple algorithmic search.

This gap is most visible in efficiency. In single-round mode, models typically use 2–6× the compute of near-optimal reference solutions. In multi-round mode, success improves, but most models remain around 1.5–2.5× the cost of brute-force scanning (with only limited cases approaching parity). In practice, this means multi-round LLM tuning is often useful for recovering from poor initial guesses, but not yet a cost-efficient replacement for systematic search.

Figure 3(a) shows where multi-round helps most: the gain is strongest at high accuracy requirements (mean improvement +28.9% across models), exactly where one-shot guessing fails because the acceptable parameter range becomes much narrower. Lower-accuracy tasks also improve, but less dramatically. This makes multi-round interaction increasingly necessary as precision requirements tighten.

Figures 3(b–c) and 3(d) show that performance depends strongly on the parameter being tuned, and that this difficulty is often task-specific rather than parameter-type-general. Single-round performance varies widely across parameter groups, while multi-round interaction compresses that gap and especially boosts harder, solver-specific parameters (the "Misc" group). At the same time, within-group task correlations are not stronger than between-group correlations, suggesting limited transfer from "easy/cheap" simulators to "hard/expensive" ones.

Figures 3(e–f) further show a trade-off in in-context learning (ICL): examples can improve single-round success, but often hurt multi-round exploration by anchoring the model to demonstrated regimes. Cost-aware examples preserve efficiency better than cost-ignorant ones, indicating that exposing cost information—not just successful settings—is important for better tuning behavior.`,

	findings: `- **Success is not the same as efficiency.** Multi-round interaction improves task completion, but most models still spend substantially more simulation budget than simple search-based baselines. This is the central gap SimulCost exposes.
- **High-accuracy tasks are the real bottleneck.** Multi-round tuning helps most when accuracy requirements are strict, where acceptable parameter regions become narrow and one-shot guesses fail more often.
- **Tuning difficulty is highly simulator-specific.** Performance varies by parameter group, but transfer across tasks is limited; being good on one family of simulators does not reliably generalize to others.
- **Cost-aware prompting matters.** In-context examples can improve one-shot tuning, but may hurt multi-round exploration by anchoring the model. Including cost information is more helpful than showing successful settings alone.
- **More reasoning is not a guaranteed fix.** Increasing reasoning effort does not consistently improve tuning quality, suggesting the bottleneck is not just "thinking longer."`,

	conclusions: `SimulCost makes one point explicit: for scientific agents, correctness alone is an incomplete metric. A model may solve more tasks, yet still be impractical if it consumes too much simulation budget. By evaluating success and cost together, SimulCost surfaces the trade-offs that matter in real simulation workflows.

The strongest near-term use case is not replacing optimization routines, but combining them with LLMs: use LLMs for initialization, guidance, and orchestration, and rely on robust search/optimization methods when efficiency or reliability is critical. SimulCost provides the benchmark and toolkit foundation for building and evaluating this next generation of cost-aware scientific agents.`,
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
