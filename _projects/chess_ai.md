---
layout: page
title: Chess Bot Player Move Predictor
description: A deep learning AI model which can predict a players move from the previous moves they made.
img: assets/img/chess.jpg
importance: 3
category: School
giscus_comments: true
---

The goal of this project was to integrate several AI algorithms to play chess at a high level. I collaborated with three teammates, each responsible for different AI algorithms. My contribution was a deep learning model that predicts a player's next move based on their previous moves.

For my model, I wanted to take a different approach than what already existed. Most prediction models at the time used CNNs which had a set number of steps they were able to look back. I was curious whether fusing an LSTM with a CNN would allow the model to better capture the temporal progression of a game. While using an LSTM differentiated my approach from many existing models, I found the most success when I incorporated much of the architecture from [AlphaZero](https://www.science.org/doi/10.1126/science.aar6404).

To train the model, I downloaded 500,000 chess games from [Lichess](https://lichess.org/). The data was in PGN format, a standard notation for chess. However, while PGN is human-readable, it cannot be directly fed into a neural network. I needed to create an algorithm to convert PGN into matrix representations suitable for model input. I initially wrote this algorithm in Python since that's where the model was built. However, with 500,000 games containing millions of individual moves, iteration took a significant amount of time. To speed up the process, I rewrote the algorithm in Rust, a systems language with much better performance for this type of task. The final implementation processed all 500,000 games in under 30 minutes and saved them to an HDF5 file, which Python could import efficiently. This approach also allowed me to store additional metadata from each game, which I could integrate into the model to improve performance if I were to revisit this project.

<div class="row justify-content-sm-center">
    <div class="col-sm-8 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/chess_ai/top_k_accuracy.png" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    The model's top-k accuracy demonstrates performance significantly above random chance, with correct moves frequently appearing among the highest-ranked predictions.
</div>

With this level of accuracy in predicting a player's move, combining the model with one of our other algorithms, most likely minimax, create a bot capable of quickly devising strong moves.

For a more in-depth analysis, we wrote a paper in AAAI format: [Access Paper Here](/assets/pdf/AI_Final_Project.pdf)