let min=0
let max=100
let answer

const startBtn = document.querySelector("button.start")
const inputBtns = document.querySelectorAll(".input-num button")
const numBtns = document.querySelectorAll("button.number")
const checkBtn = document.querySelector("button.check")
const resetBtn = document.querySelector("button.reset")

window.onload = function () {
  controlBtn()

  startBtn.addEventListener("click", getRandom)
  startBtn.addEventListener("click", controlBtn)

  let range = document.querySelector(".show-range")
  let rangeP = document.createElement("p")
  rangeP.innerText = `${min} ~ ${max}`
  range.append(rangeP)

  let guessBox = document.querySelector(".show-num")
  let guessBoxP = document.createElement("p")
  guessBox.append(guessBoxP)

  numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", getGuess)
  })

  checkBtn.addEventListener("click", getRange)
  resetBtn.addEventListener("click", resetNum)
}

function getRandom() {
  answer = Math.floor(Math.random() * 98) + 1
}
function getGuess() {
  let p = document.querySelector(".show-num p")
  p.innerText += this.innerText
}

function getRange() {
  let guessP = document.querySelector(".show-num p")
  let num = parseInt(guessP.innerText)
  guessP.innerText = ""

  if (num >= max || num <= min) {
    alert("請輸入範圍內的數字")
  } else if (num == answer) {
    alert("正確答案")
    answer = undefined
    min = 0
    max = 100
    document.querySelector(".show-range p").innerText = `${min} ~ ${max}`
    controlBtn()
  } else {
    if (num < answer) {
      min = num
    } else if (num > answer) {
      max = num
    }
    let rangeP = document.querySelector(".show-range p")
    rangeP.innerText = `${min} ~ ${max}`
  }
}

function resetNum() {
  let guessP = document.querySelector(".show-num p")
  guessP.innerText = ""
}

function controlBtn() {
  if (answer == undefined) {
    inputBtns.forEach((btn) => {
      btn.disabled = true
    })
    startBtn.disabled = false
  } else {
    inputBtns.forEach((btn) => {
      btn.disabled = false
    })
    startBtn.disabled = true
  }
}
