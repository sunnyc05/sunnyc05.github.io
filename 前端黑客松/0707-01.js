let min, max, answer
controlBtn()

window.onload = function () {
  let startBtn = document.querySelector("button.start")
  startBtn.addEventListener("click", getRandom)
  startBtn.addEventListener("click", controlBtn)

  min = 0
  max = 100

  let range = document.querySelector(".show-range")
  let rangeP = document.createElement("p")
  rangeP.innerText = `${min} ~ ${max}`
  range.append(rangeP)

  let guessBox = document.querySelector(".show-num")
  let guessBoxP = document.createElement("p")
  guessBox.append(guessBoxP)

  let numBtns = document.querySelectorAll(".number")
  numBtns.forEach((numBtn) => {
    numBtn.addEventListener("click", getGuess)
  })

  let checkBtn = document.querySelector("button.check")
  checkBtn.addEventListener("click", getRange)

  let resetBtn = document.querySelector("button.reset")
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

  if (num > max || num < min) {
    alert("請輸入範圍內的數字")
  } else if (num == answer) {
    alert("正確答案")
    answer = undefined
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
  let inputBtns = document.querySelectorAll(".input-num button")
  let startBtn = document.querySelector("button.start")

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
