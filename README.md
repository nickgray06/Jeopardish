# Jeopard(ish)!
-> Your virtual trivia game <-


## Table of Contents
- [General Info](#general-info)
- [Intro Video](#intro-video)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Code Example](#code-example)
- [Status](#status)
- [Inspiration](#inspiration)
- [Contact](#contact)


## General Info
Jeopard(ish)! is a full-stack web-based trivia application


## Intro Video
[Jeopard(ish)!](https://www.youtube.com/watch?v=tD3j_g64p84)


# Technologies 
- Ruby - version 2.6.6
- Rails
- Javascript
- HTML
- CSS


## Setup 
To run Jeopard(ish)!, fork and clone this GitHub repository. Then run:

cd backend
bundle install
rails db:migrate
rails db:seed
rails s

cd frontend
lite-server


## Code Example

```js
  //cleans correct answer and user answer
  function cleanAnswer(answer) {
    let niceAnswer = answer.toLowerCase()
    niceAnswer = niceAnswer.replaceAll("<i>", "")
    niceAnswer = niceAnswer.replaceAll("</i>", "")
    niceAnswer = niceAnswer.replaceAll("a", "")
    niceAnswer = niceAnswer.replaceAll("an", "")
    niceAnswer = niceAnswer.replaceAll("the", "")
    niceAnswer = niceAnswer.replaceAll("-", "")
    niceAnswer = niceAnswer.replaceAll(/ /g, "")
    return niceAnswer.trim()
  }
```

## Features
- Seeds database with clues, answers from external API
- Click on clue card to display question
- User enters answer, displays correct or incorrect
- If answer is correct, question value is added to user winnings
- Incorporates answer cleaning function to permit answers similar to correct answer
- Includes animations, embedded audio, modals, and a favicon


## Status
This project is currently finished. We may introduce new features or refactor existing code going forward.


## Inspiration
We built Jeopard(ish)! as our Mod 2 full-stack web app project. Being d̶e̶v̶s̶ nerds, we're big fans of trivia ;)


## Contact
Jeopard(ish)! was created by [Chris Follen](https://www.linkedin.com/in/chrisfollen/), [Nick Gray](https://www.linkedin.com/in/nick-gray-06/)

Feel free to reach out!



