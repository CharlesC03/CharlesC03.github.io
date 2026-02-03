---
layout: page
title: Bias Transfer in Model Distillation
description: Investigated bias propagation during knowledge distillation from Llama 3.1 8B Instruct to smaller student architectures (BoW, CNN, DistilBERT), quantifying measurable increases in racial and gender bias across student models.
img: assets/img/llama.jpg
importance: 1
category: School
related_publications: false
---

This project was completed as a final project for my Natural Language Processing class. The goal was to understand how bias transfers during the process of model distillation. We used one teacher model and several student models with smaller, simpler architectures. My two teammates built the student models, which consisted of Bag-of-Words, CNN, and DistilBERT (a smaller version of BERT) all which we later fine-tuned for sentiment analysis.

My contributions were implementing the teacher model pipeline and performing the bias analysis. I wrote code to download Llama 3.1 8B Instruct from Hugging Face and generate soft labels for the training data. I chose Llama 3.1 over newer versions because it was accessible via Hugging Face, and I used the 8B parameter variant due to hardware limitations—it was the largest model I could run locally. The training data came from the IMDB dataset, a well-established benchmark for sentiment analysis that should contain minimal inherent bias.

To generate soft labels, I created a few-shot prompt containing example reviews with their sentiment labels, followed by a new review for the model to classify:

{% raw %}

```text
Text: This is such a crappy movie I have no idea how it got on the shelves, they must have paid the movie store to make them put it there, seriously! The story makes absolutely no sense unless you are on some seriously heavy drugs, you would definitely have to be on something in order to watch this total piece of garbage, so much so that you would not care what was on the TV because you're almost in a coma. The writing sounds like it was done by a 5-year-old and the acting is worse than grade school plays. The hideous special effects they were trying to do look so stupid, what did they spend a whole $5 to make the entire movie, it looks like it! Oh my, that scene with the old woman who has an 80's hairdo and the ugly girls in the rubber suits, me and my friends laughed so hard. Did someone actually think it was a good idea to make this into a movie? I find that hard to believe!
Sentiment: Negative

Text: Wow! I have seen so many bad low budget films lately, but this one is great. The very realistic portrayal of police life in a city on the East German coast is a strong contrast to other crime movies or series. I loved the main actress and the absolute rejection of any prevalent cliché about the police. This film is realistic like a documentation and entertaining like a drama at the same time. A perfect tradeoff!
Sentiment: Positive

Text: I've seen tons of science fiction from the 70s; some horrendously bad, and others thought provoking and truly frightening. Soylent Green fits into the latter category. Yes, at times it's a little campy, and yes, the furniture is good for a giggle or two, but some of the film seems awfully prescient. Here we have a film, 9 years before Blade Runner, that dares to imagine the future as somthing dark, scary, and nihilistic. Both Charlton Heston and Edward G. Robinson fare far better in this than The Ten Commandments, and Robinson's assisted-suicide scene is creepily prescient of Kevorkian and his ilk. Some of the attitudes are dated (can you imagine a filmmaker getting away with the "women as furniture" concept in our oh-so-politically-correct-90s?), but it's rare to find a film from the Me Decade that actually can make you think. This is one I'd love to see on the big screen, because even in a widescreen presentation, I don't think the overall scope of this film would receive its due. Check it out.
Sentiment: Positive

Text: [FILL IN]
Sentiment: 
```

{% endraw %}

By splitting the IMDB dataset into training and testing sets and running inference on all training examples, I generated a dataset of soft labels—probability distributions over Positive and Negative sentiment—that the student models could learn from.

To analyze bias in the models, I evaluated their performance on the [Equity Evaluation Corpus](https://huggingface.co/datasets/peixian/equity_evaluation_corpus) (EEC), which contains structured sentences that vary by race, gender, and emotion. This allowed us to compare sentiment predictions across models and examine differences between training directly on IMDB labels versus training on the teacher model's soft labels. Unsurprisingly, we found that biases transferred from the teacher model to the student models. Additionally, it was discovered that larger student models were better at learning these biases—DistilBERT exhibited the largest shifts in bias compared to the simpler architectures.

While we observed clear bias transfer, there are important caveats to consider. Many models showed low confidence when predicting sentiment on the EEC dataset, suggesting that EEC sentences were outside the distribution the models had learned. If I were to continue this work, I would use a more diverse training dataset to improve generalization. I would also consider creating a custom evaluation dataset similar to EEC but specifically designed for sentiment analysis, since EEC was originally structured for emotion detection. Two approaches could address this mismatch: adapting the models to predict emotion rather than sentiment, or creating a new dataset that varies sentences by sentiment rather than emotion. Finally, I would expand the analysis to cover a broader range of racial and gender categories to build a more comprehensive bias profile.

For a more in-depth analysis of the results: [Download Paper](/assets/pdf/NLP_Final_Paper.pdf)

To view all the code for this project: [GitHub Repository](https://github.com/CharlesC03/NLP_Final_Project)

