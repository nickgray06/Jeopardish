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

const answer = new URLSearchParams(window.location.search).get('answer')
const apiURL = "http://localhost:3000"
const cluesURL = `${apiURL}/clues`
const categoryURL = `${apiURL}/categories`
const section = document.querySelector('#question-info')
let thisClue
const button = document.getElementById('submit-button')



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
    console.log(div)
    div.innerText = thisClue.question
    console.log(div)
    section.append(div)
    console.log(section)
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

  function submitAnswer(event){
    console.log(answerInput.value)
    
    if (thisClue.answer === answerInput.value) {
      console.log('coorect')
    } else {
      console.log('nahhhh brahhh')
    }
    event.preventDefault()

  }

  const answerInput = document.getElementById('answer-in')
  button.addEventListener('submit', submitAnswer)