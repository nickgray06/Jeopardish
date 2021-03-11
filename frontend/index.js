
//set up html elements
const answer = new URLSearchParams(window.location.search).get('answer')
const apiURL = "http://localhost:3000"
const cluesURL = `${apiURL}/clues`
const categoryURL = `${apiURL}/categories`
const section = document.querySelector('#question-info')
let thisClue
const button = document.querySelector('.submit-button')
const modalQuestion = document.querySelector('.question-info')
const modalResult = document.querySelector('.modal-result')
const answerInput = document.querySelector('#answer-in')
const modal = document.querySelector(".modal-card");
const categoryIds = [1,2,3,4,5,6]
let thisCategory
let clueArray = []
const board = document.querySelector('#board')
const scoreDiv = document.querySelector('#score-number')
const putScore = document.createElement('p')
const currentScore = 0


modal.style.display = "none"

const gameInit = () => {
  categoryIds.forEach(category => {
    fetch(categoryURL + `/${category}`)
      .then(parseJSON)
      .then(getCluesAndCategory)
      .then(buildBoard)

  })
}

// fetch(categoryURL)
//   .then(parseJSON)
//   .then(catArray)
//   .then(console.log)
//   .then(categories =>fetch(categoryURL + `/${pickCategory(categories)}`))
//   .then(parseJSON)
//   .then(getClue)
//   .then(getClue => thisClue = getClue)
//   .then(createClueCard)
//   .then(() => console.log(thisClue))


  // function createClueCard(thisClue) {
  //   const div = document.createElement('h3')
  //   div.innerText = thisClue.question
  //   modalQuestion.append(div)
  // }

  function getCluesAndCategory(category){
    let someClues = []
    clueArray = []
    category.clues.forEach(clue => {
      someClues.push(clue)
    } )
    shuffle(someClues)
    clueArray.push(someClues[0], someClues[1],someClues[2],someClues[3],someClues[4])
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
      let currentClue = document.createElement('p')
      currentClue.textContent = `$${clue.value}` 
      clueCard.append(currentClue)
      column.append(clueCard)
    })
    board.append(column)
    putScore.textContent = currentScore
    scoreDiv.append(putScore)
    
  }


  // function pickCategory(categories){
  //   return shuffle(categories)[0].id
  // }

  function parseJSON(response) {
    return response.json()
  }

  let displayResults

  function submitAnswer(event){
    modalQuestion.style.display = "none"
    button.style.display = "none"
    let userAnswer = cleanAnswer(answerInput.value)
    let correctAnswer = cleanAnswer(thisClue.answer)
    
    
    if (correctAnswer === userAnswer) {
      displayResults = document.createElement('p')
      displayResults.innerText = "Good for you, thats right!"
      modalResult.replaceChildren(displayResults)
    } else {
      displayResults = document.createElement('p')
      let displayAnswer = thisClue.answer
      displayAnswer = displayAnswer.replace("<i>", "")
      displayAnswer = displayAnswer.replace("</i>", "")
      displayResults.innerText = `Sorry, no. The correct answer was ${displayAnswer}.`
      modalResult.replaceChildren(displayResults)
    }
    
    setTimeout(() => {
      console.log(modal)
      modal.style.display = "none"
    }, 2500)

    event.preventDefault()
  }

  button.addEventListener('submit', submitAnswer)

  //cleans corect answer and user answer
  function cleanAnswer(answer) {
    let niceAnswer = answer.toLowerCase()
    niceAnswer = niceAnswer.replace("<i>", "")
    niceAnswer = niceAnswer.replace("</i>", "")
    niceAnswer = niceAnswer.replace(/ /g, "")
    niceAnswer = niceAnswer.replace("a", "")
    niceAnswer = niceAnswer.replace("an", "")
    niceAnswer = niceAnswer.replace("the", "")

    return niceAnswer.trim()
  }

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
button.onsubmit = function() {
  modal.style.display = "block";
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

