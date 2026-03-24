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
	{ name: "Yadi Cao",            coFirst: true,  affiliationIndices: [1] },
	{ name: "Sicheng Lai",         coFirst: true,  affiliationIndices: [2], remark: true },
	{ name: "Jiahe Huang",         coFirst: true,  affiliationIndices: [1] },
	{ name: "Yang Zhang",          coFirst: true,  affiliationIndices: [3], remark: true },
	{ name: "Zach Lawrence",       coFirst: true,  affiliationIndices: [1] },
	{ name: "Rohan Bhakta",        coFirst: true,  affiliationIndices: [1] },
	{ name: "Izzy F. Thomas",      coFirst: true,  affiliationIndices: [1] },
	{ name: "Mingyun Cao",         coFirst: true,  affiliationIndices: [4] },
	{ name: "Chung-Hao Tsai",      coFirst: false, affiliationIndices: [1] },
	{ name: "Zihao Zhou",          coFirst: false, affiliationIndices: [1] },
	{ name: "Yidong Zhao",         coFirst: false, affiliationIndices: [6] },
	{ name: "Hao Liu",             coFirst: false, affiliationIndices: [5] },
	{ name: "Alessandro Marinoni", coFirst: false, affiliationIndices: [1] },
	{ name: "Alexey Arefiev",      coFirst: false, affiliationIndices: [1] },
	{ name: "Rose Yu",             coFirst: false, affiliationIndices: [1] },
];

export const affiliations = [
	{ index: 1, name: "University of California San Diego" },
	{ index: 2, name: "The Chinese University of Hong Kong, Shenzhen" },
	{ index: 3, name: "Peking University" },
	{ index: 4, name: "University of California, Los Angeles" },
	{ index: 5, name: "California Institute of Technology" },
	{ index: 6, name: "ETH Zurich" },
];

// External links (replace '#' with actual URLs)
export const links = {
	paper: "https://arxiv.org/abs/2603.20253",
	code: "https://github.com/Rose-STL-Lab/SimulCost-Bench",
	tools: "https://github.com/Eydcao/simulcost-tools",
	dataset: "https://huggingface.co/datasets/Rose-STL-Lab/SimulCost-Bench",
	cacheBaseline: "https://huggingface.co/datasets/LeoLai689/SimulCost-baseline-sim_res",
	cacheFull: "https://huggingface.co/datasets/LeoLai689/SimulCost-full-sim_res",
};

// Navigation items
export const navItems = [
	{ label: "About", href: "#about", sectionTitle: "Abstract" },
	{ label: "Methodology", href: "#simulators", sectionTitle: "How does SimulCost work?" },
	{ label: "Results", href: "#results", sectionTitle: "Main Results" },
	{ label: "Findings", href: "#findings", sectionTitle: "Key Findings" },
	{ label: "Takeaways", href: "#takeaways", sectionTitle: "Practical Takeaways" },
	{ label: "Future", href: "#future", sectionTitle: "What's Next?" },
	{ label: "Conclusions", href: "#conclusions", sectionTitle: "Conclusions" },
	{ label: "Citation", href: "#citation", sectionTitle: "Citation" },
];

// Section content
export const sections = {
	abstract: `LLMs are increasingly used in science and engineering applications, from generating simulation code to calling solvers and tuning parameters. But here's a problem nobody is measuring: <strong>how much extra compute do they spend getting to the right answer?</strong>

Most benchmarks treat tool use as free. Metrics like pass@k only ask whether the model succeeds within K random trials, but never at what cost. In realistic workflows involving physics-based simulation, a bad parameter choice doesn't just give a wrong result — it can burn hours of expensive computation. When a simulation's cost scales quadratically, cubically, or even worse with resolution, picking the wrong grid size isn't just suboptimal. It's impractical.

We built SimulCost to measure exactly that. SimulCost is the first benchmark that evaluates both <strong>success rate</strong> and <strong>computational cost</strong> for LLM-driven simulation automation. We test whether LLMs can choose or tune parameters like grid resolution, timestep size, or convergence tolerance that satisfy accuracy requirements without blowing the compute budget.

The benchmark spans <strong>12 physics simulators</strong> across <strong>3 domains</strong> (fluid dynamics, solid mechanics, and plasma physics), with <strong>3 accuracy levels</strong> and <strong>4,816 tasks</strong> in total. We evaluate both single-round mode (one-shot guess) and multi-round mode (trial-and-error with simulator feedback). A team of <strong>11 domain experts</strong> — professors, postdocs, and students in physics, mechanical engineering, and nuclear engineering — developed, defined cost formulas for, and validated every solver.

We also open-source our toolkit (<strong>simulcost-tools</strong>) with all 12 solver libraries and standardized interfaces, so you can reproduce our results, add new simulators, or build your own cost-aware evaluation pipelines.`,

	simulators: `Here's what a SimulCost task looks like: you give an LLM a physics simulation problem — say, a 2D fluid flow — along with a low, medium, or high accuracy requirement. Each task specifies which <strong>cost-sensitive parameter</strong> the model must tune — for example, spatial resolution or timestep — while everything else stays fixed. The challenge is clear: overly coarse settings fail the accuracy check and can hurt downstream applications like design choices, while overly fine settings pass but waste computation. The sweet spot is what domain experts spend years developing intuition for.

We organize the evaluation into four stages. First, <strong>dataset curation</strong>: domain experts build or adapt solvers, run brute-force scans to find reference solutions that achieve near-minimal cost while meeting accuracy requirements, scale up task diversity across accuracy levels, and filter out infeasible cases. Second, <strong>task construction</strong>: each task isolates a single tunable parameter, making comparisons controlled and reproducible. Third, <strong>LLM inference</strong> in two key modes — <span style="color:#2563EB;font-weight:600">single-round</span> (one shot, no feedback) and <span style="color:#14B8A6;font-weight:600">multi-round</span> (up to 10 trials with simulator feedback including convergence status, error metrics, and accumulated cost). Fourth, <strong>evaluation</strong>: we measure success rate and cost efficiency relative to the brute-force scan reference.

For reproducibility, we define cost using <strong>solver-specific FLOP accounting</strong> — analytically derived, platform-independent cost formulas that count dominant operations for each solver. For EPOCH (a plasma PIC code), we use wall time on a standardized machine. This makes our cost comparisons reproducible across hardware.

The tunable parameters fall into four groups: <strong>Spatial</strong> (grid resolution, particle density), <strong>Temporal</strong> (timestep, CFL number), <strong>Tolerance</strong> (convergence thresholds), and <strong>Misc</strong> (solver-specific parameters like limiter coefficients or relaxation factors). This grouping reveals interesting performance patterns.`,

	results: `We tested five LLMs: <strong>GPT-5</strong>, <strong>Claude-3.7-Sonnet</strong>, <strong>GPT-OSS-120B</strong>, <strong>Llama-3-70B-Instruct</strong>, and <strong>Qwen3-32B</strong> across all 12 simulators. The headline: LLMs can do the job, but they're not cheap about it.

In single-round mode, success rates range from 46% to 64% depending on the model. That sounds decent — until you realize even the best model fails a third of the time on its first try. When accuracy requirements get strict, performance drops hard: from ~65% at low accuracy to ~41% at high accuracy. The models' initial guesses are unreliable precisely when precision matters most. On the cost side, successful single-round attempts use <strong>2–6x the compute</strong> of near-optimal reference solutions. LLMs can find parameters that work, but they tend toward "safe" overestimates like picking a finer grid than necessary.

Multi-round mode is where things get interesting. Letting the model iterate with simulator feedback boosts success rates to 71–80%. The biggest gains come at high accuracy (+28.9% improvement on average across models), exactly where single-round guessing fails. But there's a catch: even with trial-and-error, most models still burn <strong>1.5–2.5x the cost of brute-force scanning</strong>. A simple grid search with no intelligence at all often finds an equally good answer for less compute.

Performance also depends heavily on the type of parameter being tuned. Spatial and Tolerance parameters are the "easiest" — LLMs likely have intuition for grid resolution and convergence thresholds from pre-training data. Solver-specific Misc parameters are the hardest in single-round mode, but multi-round interaction helps them the most (+23% improvement).

We also tested in-context learning (ICL) with different example types, and the finding is counterintuitive: <strong>examples help single-round performance but can hurt multi-round exploration</strong>, seemingly by anchoring the model to demonstrated parameter regimes. Including cost information in examples preserves efficiency better than showing only successful settings, which hints that cost-awareness needs to be explicitly taught, not just implied. We also compared against <strong>Bayesian Optimization</strong> (BO with Gaussian Process surrogate) in multi-round mode. BO achieves comparable success rates overall but shows much higher variance across simulators. LLMs have an edge in efficiency at low accuracy requirements (efficiency 2.03 vs BO's 1.02), while BO's greedy exploration strategy tends to overshoot into expensive territory at high accuracy. Neither approach dominates — they have complementary strengths.`,

	findings: `- **Solving ≠ solving efficiently.** Multi-round interaction helps LLMs complete more tasks, but they still burn much more compute than a simple brute-force scan. Getting the right answer is one thing. Getting it cheaply is a different skill entirely.
- **High accuracy is the real stress test.** When precision requirements tighten, the acceptable parameter range shrinks dramatically. Single-round guesses fail much more often, and multi-round trial-and-error becomes necessary but expensive.
- **Every simulator is its own puzzle.** Performance varies by parameter type, but being good at one simulator doesn't help much on another. Within-group and between-group task correlations are statistically indistinguishable, which suggests difficulty is task-specific rather than type-specific. Don't expect fine-tuning on cheap simulators to transfer to expensive ones.
- **Cost information in examples is critical for efficiency.** In-context learning can improve one-shot guessing by 15–25%, but it can also anchor the model and hurt multi-round exploration. The key insight is that showing cost information in examples preserves efficiency better than showing only correct parameters.
- **Thinking harder doesn't help.** We tested GPT-5's reasoning effort parameter at Minimal, Medium, and High settings. The result? We found no significant difference. The bottleneck isn't how long the model thinks — it's what the model knows about the physics.`,

	takeaways: `- **For quick previews, LLMs are fine.** If accuracy requirements are loose and you just need a rough parameter estimate, a single LLM call gets you a reasonable starting point 46–64% of the time. Don't expect cost efficiency — think of it as a fast sanity check.
- **For high-accuracy tasks, let LLMs call the search.** When precision matters, multi-round mode is necessary (71–80% success), but LLMs are 1.5–2.5x slower than brute-force scanning. We recommend having LLMs orchestrate and initialize, then handing off to systematic search algorithms for the final tuning.
- **Don't train on cheap sims and expect transfer.** The lack of cross-task correlation means fine-tuning on fast, inexpensive simulators is unlikely to improve performance on slow, expensive ones, even within the same parameter type.
- **If using RAG for simulation tuning, include cost data.** In-context examples help, but cost-ignorant examples can degrade multi-round efficiency. You should always include cost information alongside successful parameter values.`,

	future: `- **Tool-augmented tuning.** Equipping LLMs with timeout-based early stopping, callable search algorithms, and multi-modal feedback like field visualizations could enable richer decision-making beyond text-only solver interaction.
- **Human-in-the-loop evaluation.** Do LLM-suggested parameters actually speed up expert workflows? Measuring real-world utility, not just benchmark scores, would validate the practical impact.
- **Cost-aware post-training.** Fine-tuning strategies that explicitly optimize for both accuracy and computational efficiency could close the gap between LLM tuning and optimal search.
- **Multi-parameter optimization.** SimulCost currently isolates one parameter at a time for tractability. Real simulations require jointly tuning multiple interdependent parameters, a much harder problem that needs adaptive sampling approaches.`,

	conclusions: `SimulCost makes one thing clear: for scientific agents, <strong>correctness alone is not enough</strong>. A model that solves the task but burns 3x the necessary compute isn't practical for real workflows where simulations take hours and cost real money.

The strongest near-term use case isn't replacing optimization routines — it's <strong>combining LLMs with them</strong>. LLMs handle initialization, guidance, and orchestration, while robust search and optimization methods take over when efficiency or reliability is critical. SimulCost provides the benchmark and toolkit to measure, compare, and improve this next generation of cost-aware scientific agents.`,
};

// Citation (replace with actual BibTeX)
export const citation = `@misc{cao2026simulcostcostawarebenchmarktoolkit,
      title={SimulCost: A Cost-Aware Benchmark and Toolkit for Automating Physics Simulations with LLMs},
      author={Yadi Cao and Sicheng Lai and Jiahe Huang and Yang Zhang and Zach Lawrence and Rohan Bhakta and Izzy F. Thomas and Mingyun Cao and Chung-Hao Tsai and Zihao Zhou and Yidong Zhao and Hao Liu and Alessandro Marinoni and Alexey Arefiev and Rose Yu},
      year={2026},
      eprint={2603.20253},
      archivePrefix={arXiv},
      primaryClass={physics.comp-ph},
      url={https://arxiv.org/abs/2603.20253},
}`;

// Footer content (exact three lines as specified)
export const footerLines = [
	"We are grateful to our supporters.",
	"© 2026. UCSD Rose Spatiotemporal Machine Learning Lab.",
	'Designed by <a href="https://sichenglai.com/" target="_blank" rel="noopener noreferrer" class="hover:text-brand-text-primary transition-colors">Sicheng Leo Lai</a>.',
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
