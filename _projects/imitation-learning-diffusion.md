---
layout: page
title: Exploring Generalization and Multi-Task Learning in Diffusion Policies with Language Conditioning
description: Re-implemented Diffusion Policy and extended it with language conditioning for multi-task robotic manipulation, then ran ablations on LIBERO-10 to study the effect of pretrained vision–language encoders, paraphrased task descriptions, and the multi-task vs. single-task performance gap.
img: assets/img/imitation-learning/imitation-learning-demo.gif
importance: 1
category: School
related_publications: false
---

This project was completed with a teammate as the final project for my deep learning class (CS7150). We were both interested in robotics and generative models, so we built on the [Diffusion Policy](https://arxiv.org/abs/2303.04137) framework from Chi et al., which formulates a robot's visuomotor controller as a denoising diffusion process over action sequences. The original formulation has one major limitation: each policy is trained for a single task. Our goal was to extend it with language conditioning so that one model could handle many tasks, and then run experiments to understand what actually drives multi-task generalization.

We re-implemented the diffusion policy from scratch and added a language pathway alongside the existing visual and proprioceptive conditioning. A frozen SigLIP2 text encoder embeds the task description, and the embedding is concatenated with the other conditioning signals before being injected into the 1D temporal CNN-UNet through FiLM layers. We designed the architecture to be modular with respect to the vision and language backbones so we could swap encoders (ResNet-18 trained from scratch, frozen SigLIP2, etc.) without changing the rest of the pipeline. All experiments were run on [LIBERO](https://arxiv.org/abs/2306.03310), specifically the LIBERO-10 split with 50 expert demonstrations per task, evaluated both on held-out initial states for seen tasks and on a set of unseen tasks drawn from LIBERO-Goal, LIBERO-Object, and LIBERO-Spatial.

<div class="row justify-content-sm-center">
    <div class="col-sm-10 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/imitation-learning/Imitation_Learning_Model_Diagram.png" title="Model architecture diagram" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Overall model architecture. Past observations and (optionally) a language instruction are encoded and concatenated alongside the noisy action sequence and diffusion timestep, then passed to the 1D UNet diffusion policy that denoises the action sequence.
</div>

We organized the work around three questions:

**1. Do jointly pretrained vision–language encoders help multi-task policy learning?** Prior work showed pretrained vision encoders like R3M underperformed end-to-end training in single-task settings, but no one had tested aligned vision–language encoders in the multi-task setting. We compared a fully frozen SigLIP2 (used as both vision and text encoder) against a ResNet-18 trained from scratch paired with the same frozen SigLIP2 text encoder. The frozen SigLIP2 vision encoder achieved 0% success across all seen tasks, while the ResNet-18 trained end-to-end reached 32.5%. Pretraining on web images alone — even with language alignment — wasn't enough; the visual backbone needs to be finetuned for visuomotor control.

**2. Do paraphrased task descriptions encourage semantic grounding?** If a model only ever sees one fixed instruction per task, that string just acts as a one-hot identifier and the language encoder has no incentive to extract meaning. To address this, I generated roughly 40 paraphrased descriptions per LIBERO-10 task using an LLM and randomly sampled one during training. Comparing identical architectures with and without paraphrasing, the model trained with paraphrases reached 32.5% mean success rate while the no-paraphrase model reached only 7.5% — and notably, the no-paraphrase model achieved 0% on 18 of the 20 evaluated configurations, suggesting it struggled to differentiate tasks at all. Paraphrasing appears to push the policy to extract compositional semantics rather than memorize fixed identifiers.

**3. What's the per-task cost of multi-task learning at fixed capacity?** We trained a single-task model (ResNet-18, no language conditioning) on one LIBERO-10 task for 500 epochs to match the multi-task model's total training duration, then compared performance on that same task. Surprisingly, the multi-task policy outperformed the single-task one (55% vs 35%). One plausible explanation is that exposure to a wider distribution of arm trajectories across tasks acts as a regularizer — the single-task policy may be overfitting to a narrow region of the state space.

A side observation worth flagging: training noise prediction loss did not correlate cleanly with task success rate. Later checkpoints with lower loss often performed worse in simulation, which means relying on loss alone for model selection is risky. Periodic environment evaluation during training is probably necessary to catch the best checkpoint.

All models achieved 0% on the unseen tasks. This isn't very surprising — zero-shot generalization in this setting really demands large-scale pretraining data, and LIBERO-10 with its 10 tasks is too narrow a slice to expect transfer. If I were to continue this work, the immediate next step would be moving training to LIBERO-90, which is designed as a training corpus rather than an evaluation benchmark and offers a much broader distribution of shorter-horizon tasks. Beyond that, I'd like to investigate finetuning various pretrained vision encoders (rather than freezing them) and explore whether visual augmentations meaningfully improve robustness.

For a more in-depth analysis of the results: [Download Paper](/assets/pdf/Imitation_Learning_Diffusion_Paper.pdf)

To view all the code for this project: [GitHub Repository](https://github.com/rz-collab/cs7150_diffusion_policy)
