//宣告
let answer, guess
const numRegex = /^([0-9]{4})$/
let countA, countB, intersect

//DOM
const startBtn = document.querySelector("button.start")
const resetBtn = document.querySelector("button.reset")
const answerBtn = document.querySelector("button.answer")
const guessBtn = document.querySelector("button.guess")
const inputArea = document.querySelector("input")
const guessResult = document.querySelector(".guess-result")

//window.onload
window.onload = function () {
  setUI()

  startBtn.addEventListener("click", function () {
    setAnswer()
    setUI()
  })
  guessBtn.addEventListener("click", function () {
    getGuessNum()
    getResult()
    showGuessResult()
    gameEnd()
  })
  inputArea.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
      getGuessNum()
      getResult()
      showGuessResult()
      gameEnd()
    }
  })
  answerBtn.addEventListener("click", showAnswer)
  resetBtn.addEventListener("click", function () {
    gameReset()
    setUI()
    guessResult.innerHTML = ""
  })
}

//function

function setAnswer() {
  answer = []
  while (answer.length < 4) {
    let num = Math.floor(Math.random() * 10)
    if (!answer.includes(num)) {
      answer.push(num)
    }
  }
}

function getGuessNum() {
  //console.log([...inputArea.value])
  let arr = [...inputArea.value].map((x) => parseInt(x))

  if (numRegex.test(inputArea.value) && [...new Set(arr)].length == 4) {
    guess = arr
    inputArea.value = ""
    //console.log(guess)
  } else {
    new bootstrap.Modal(document.getElementById("guess-wrong-type")).show()
    inputArea.value = ""
  }
}

function showAnswer() {
  let showAnswerModal = document.getElementById("show-answer")
  showAnswerModal.querySelector("p").innerText = `正確答案：${answer.join("")}`
  new bootstrap.Modal(showAnswerModal).show()
}

function getResult() {
  intersect = answer.filter((x) => guess.includes(x))
  //console.log(intersect)
  countA = intersect.filter((x) => answer.indexOf(x) == guess.indexOf(x)).length
  //console.log(countA)
  countB = intersect.length - countA
}

function showGuessResult() {
  let li = document.createElement("li")
  li.classList.add("list-group-item", "d-flex", "align-items-center")

  let liP = document.createElement("p")
  liP.innerText = guess.join("")
  liP.classList.add("m-0")

  let liDiv = document.createElement("div")
  liDiv.innerText = `${countA}A${countB}B`
  liDiv.classList.add("rounded-2", "me-2", "py-1", "px-2")
  if (countA == 4) {
    liDiv.classList.add("bg-success")
  } else {
    liDiv.classList.add("bg-danger")
  }

  li.append(liDiv, liP)
  guessResult.append(li)
  guessResult.scrollTo(0, guessResult.scrollHeight)
}

function gameEnd() {
  if (countA == 4) {
    new bootstrap.Modal(document.getElementById("correct-answer")).show()
    gameReset()
    setUI()
    resetBtn.disabled = false
    startBtn.disabled = true
  }
}

function gameReset() {
  answer = undefined
  guess = undefined
  intersect = undefined
  countA = undefined
  countB = undefined
}

function setUI() {
  if (answer == undefined) {
    startBtn.disabled = false
    resetBtn.disabled = true
    answerBtn.disabled = true
    guessBtn.disabled = true
    inputArea.disabled = true
  } else {
    startBtn.disabled = true
    resetBtn.disabled = false
    answerBtn.disabled = false
    guessBtn.disabled = false
    inputArea.disabled = false
  }
}
