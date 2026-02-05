---
layout: page
title: High Speed Footage Analyzer
description: Tool for tracking flashing light from High Speed Footage.
img:
importance: 4
category: Work
related_publications: false
---

During my co-op at Gentuity, I developed a video analysis tool to help engineers better understand product behavior captured via high-speed camera footage. The system tracks a light source on a moving object—detecting both position and brightness transitions—and exports the data to CSV for further analysis.

I designed the project with three core principles: accessibility, maintainability, and customizability. To make it accessible to users of varying technical backgrounds, I implemented three interfaces: a Python package for direct class access, a CLI for scripted workflows, and a GUI for interactive use. For maintainability, I kept the codebase clean and well-documented so future developers could continue building on it after my departure. This principle of clean and well-documented code is something I have found to be endlessly helpful in future projects and something that I further developed during my time at S1 Industries. I talk about this more in my [Tic-Tac-Toe project](/projects/tic_tac_toe). For customizability, I built a modular architecture that allows users to write and plug in their own tracking algorithms.

The project was built in Python using OpenCV. I also explored multiprocessing to parallelize the image processing pipeline, but found through benchmarking that the serial implementation actually performed faster. This was a good lesson for me in that parallelization may not always be worth it due to the overhead and extra requirements for it to operate.
