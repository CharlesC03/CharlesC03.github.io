---
layout: page
title: High Speed Footage Analyzer
description: with background image
img:
importance: 4
category: Work
related_publications: false
---

I did this project during my co-op at Gentuity. This project I worked on during the entirety of my co-op. They offered me the option of doing projects while I was there as my job left me lots of extra time. The mindset I had with my project is that it was accessible by all levels of people, that anyone would be able to continue develop on it after I left, and that it was extremely customizable. For it to be accessible I made sure it could be used as a python package allowing for direct access to the classes, accessable via cli commands, and lastly via a GUI I created.

The code for the project was done in python and utilized opencv. To make it customizable I designed it with modularity in mind. I made it so that anyone could write their own tracking algorithm and that it would become available as an option in the code.

I additionally played around with multiproccessing for the application as I initially though that since I thought you could do all the image processing in parallel, however, in the end discovered that actually ran faster without multiprocessing.
