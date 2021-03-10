
//set up html elements
const answer = new URLSearchParams(window.location.search).get('answer')
const apiURL = "http://localhost:3000"
const cluesURL = `${apiURL}/clues`
const categoryURL = `${apiURL}/categories`
const section = document.querySelector('#question-info')
let thisClue
const button = document.getElementById('submit-button')
const modalText = document.getElementById('modal-text')
const answerInput = document.getElementById('answer-in')


fetch(categoryURL)
  .then(parseJSON)
  .then(categories =>fetch(categoryURL + `/${pickCategory(categories)}`))
  .then(parseJSON)
  .then(getClue)
  .then(getClue => thisClue = getClue)
  .then(createClueCard)
  .then(() => console.log(thisClue))

  function createClueCard(thisClue) {
    const div = document.createElement('h3')
    div.innerText = thisClue.question
    section.append(div)
  }

  function getClue(object){
    const clueArray = []
    object.clues.forEach(clue => {
      clueArray.push(clue)
    } )
    return shuffle(clueArray)[0]
  }

  function pickCategory(categories){
    return shuffle(categories)[0].id
  }

  function parseJSON(response) {
    return response.json()
  }

  let displayResults

  function submitAnswer(event){
    console.log(answerInput.value)
    let userAnswer = cleanAnswer(answerInput.value)
    let correctAnswer = cleanAnswer(thisClue.answer)
    
    
    if (correctAnswer === userAnswer) {
      displayResults = document.createElement('p')
      displayResults.innerText = "Good for you, thats right!"
      modalText.replaceChildren(displayResults)
    } else {
      displayResults = document.createElement('p')
      let displayAnswer = thisClue.answer
      displayAnswer = displayAnswer.replace("<i>", "")
      displayAnswer = displayAnswer.replace("</i>", "")
      displayResults.innerText = `Sorry, no. The correct answer was ${displayAnswer}.`
      modalText.replaceChildren(displayResults)
    }
    event.preventDefault()
  }



  button.addEventListener('submit', submitAnswer)

  //cleans corect answer and user answer
  function cleanAnswer(answer) {
    let niceAnswer = answer.toLowerCase()
    niceAnswer = niceAnswer.replace("<i>", "")
    niceAnswer = niceAnswer.replace("</i>", "")
    niceAnswer = niceAnswer.replace(/ /g, "")
    niceAnswer = niceAnswer.replace(/^a /, "")
    niceAnswer = niceAnswer.replace(/^an /, "")
    niceAnswer = niceAnswer.replace("the", "")
    console.log(niceAnswer)

    return niceAnswer.trim()
  }


// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
button.onsubmit = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  button.reset()
  // location.reload()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display =  "none";
    // location.reload()
  }
}


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

