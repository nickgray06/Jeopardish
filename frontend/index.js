
//set up html elements
const answer = new URLSearchParams(window.location.search).get('answer')
const apiURL = "http://localhost:3000"
const cluesURL = `${apiURL}/clues`
const categoryURL = `${apiURL}/categories`
let thisClue
const submitButton = document.querySelector('.submit-button')
const modalQuestion = document.querySelector('.question-info')
const modalResult = document.querySelector('.modal-result')
const answerInput = document.querySelector('#answer-in')
const modal = document.querySelector('#modal-card')
const categoryIds = [1,2,3,4,5,6]
let categoryCounter = 0
let clueArray = []
let allClues = []
let clueIdCount = 1
const board = document.querySelector('#board')
const scoreDiv = document.querySelector('#score-number')
let putScore = document.createElement('p')
let currentScore = 0
let clickedClue
let displayResults = document.createElement('p')
let displayQuestion

let audio = document.querySelector('#music-controls')
audio.volume=0.1

modal.style.display = "none"

const gameInit = () => {
  categoryIds.forEach(category => {
    fetch(categoryURL + `/${category}`)
      .then(parseJSON)
      .then(getCluesAndCategory)
      .then(buildBoard)
  })
  board.addEventListener("click", clueClicked)
}

  function parseJSON(response) {
    return response.json()
  }

  function getCluesAndCategory(category){
    let someClues = []
    clueArray = []
    category.clues.forEach(clue => {
      someClues.push(clue)
    } )
    shuffle(someClues)
    clueArray.push(someClues[0], someClues[1],someClues[2],someClues[3],someClues[4])
    someClues[0].id = clueIdCount
    clueIdCount += 1
    someClues[1].id = clueIdCount
    clueIdCount += 1
    someClues[2].id = clueIdCount
    clueIdCount += 1
    someClues[3].id = clueIdCount
    clueIdCount += 1
    someClues[4].id = clueIdCount
    clueIdCount += 1
    allClues.push(someClues[0], someClues[1],someClues[2],someClues[3],someClues[4])
    let valueCounter = 200
    clueArray.forEach(clue => {
      clue.value = valueCounter
      valueCounter += 200
    })
    thisCategory = category.title
    return clueArray
  }

  function buildBoard() {
    let column = document.createElement('div')
    column.className = 'column'
    let catCard = document.createElement('div')
    catCard.className = 'category-card'
    let catName = document.createElement('p')
    catName.textContent = thisCategory.toUpperCase()
    catCard.append(catName)
    column.append(catCard)
    
    clueArray.forEach(clue => {
      let clueCard = document.createElement('div')
      clueCard.className = 'clue-card'
      let currentClue = document.createElement('div')
      currentClue.innerHTML = `<button id="${clue.id}">$${clue.value}</button>` 
      clueCard.append(currentClue)
      column.append(clueCard)
    })
    board.append(column)
    putScore.textContent = `$${currentScore}`
    scoreDiv.append(putScore)
  }

  function clueClicked(event){
    let clickedClueId = event.target.id 
    clickedClue = allClues[clickedClueId - 1]
  
    if (clickedClueId) {
      event.target.style.display = "none"
      putQuestion()
    }
  }

  function putQuestion() {
    modal.style.display = "block"
    displayQuestion = document.createElement('p')
    displayQuestion.className = 'display-question'
    modalQuestion.style.display = "block"
    submitButton.style.display = "block"
    submitButton.reset ()
    displayQuestion.textContent = clickedClue.question
    modalQuestion.replaceChildren(displayQuestion)
    modalResult.replaceChildren(displayResults)
    displayResults.innerText = ""
    modalResult.replaceChildren(displayResults)
    submitButton.addEventListener('submit', submitAnswer)
  }

  function submitAnswer(event){
    event.preventDefault()
    modalQuestion.style.display = "none"
    submitButton.style.display = "none"
    let userAnswer = cleanAnswer(answerInput.value)
    let correctAnswer = cleanAnswer(clickedClue.answer)
    
    if (correctAnswer.includes(userAnswer) || userAnswer.includes(correctAnswer)) {
      let displayAnswer = clickedClue.answer
      let rightString = document.createElement('p')
      rightString.className = 'right-string'
      rightString.innerText = "Good for you, thats right!"
      let displayAnswerString = document.createElement('h6')
      displayAnswerString.className = 'display-answer-string'
      displayAnswer = displayAnswer.replace("<i>", "")
      displayAnswer = displayAnswer.replace("</i>", "")
      displayAnswerString.textContent = displayAnswer
      displayResults.replaceChildren(rightString, displayAnswerString)
      modalResult.replaceChildren(displayResults)
      currentScore += clickedClue.value
      putScore.textContent = `$${currentScore}`
    } else {
      let displayAnswer = clickedClue.answer
      let wrongString = document.createElement('p')
      wrongString.className = 'wrong-string'
      let displayAnswerString = document.createElement('h6')
      displayAnswerString.className = 'display-answer-string'
      displayAnswer = displayAnswer.replace("<i>", "")
      displayAnswer = displayAnswer.replace("</i>", "")
      wrongString.innerText = "Sorry, no. The correct answer was:"
      displayAnswerString.textContent = displayAnswer
      displayResults.replaceChildren(wrongString, displayAnswerString)
      modalResult.replaceChildren(displayResults)
    }
    
    setTimeout(() => {
      modal.style.display = "none"
    }, 2500)
  }

  //cleans corect answer and user answer
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

gameInit()


//UTILITIES
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

