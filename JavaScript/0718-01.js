//宣告
const url =
  "https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json"
let row, cardTemplate
let heroArray = []
let objectItem = {}

//DOM
row = document.querySelector(".row")
cardTemplate = document.querySelector("#heroCard")

//window.onload
window.onload = function () {
  fetchJson(url)
}

//function
function fetchJson(url) {
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      objectItem = result.data
      heroArray = Object.values(objectItem)
      heroArray.forEach((item, index) => {
        row.append(createCard(item, index))
      })
      console.log(heroArray)
    })
    .catch()
}

function createCard(item, index) {
  let cloneCard = cardTemplate.content.cloneNode(true)

  cloneCard.querySelector(
    "img"
  ).src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_0.jpg`
  cloneCard.querySelector(".card-title").innerText = `${index + 1}. ${
    item.id
  } - ${item.name}`
  cloneCard.querySelector(".card-text").innerText = `${item.blurb.substring(
    0,
    20
  )}...`
  cloneCard.querySelector(".card-btn").addEventListener("click", function () {
    setModal(item, index)
  })

  return cloneCard
}

function setModal(item, index) {
  let modal = document.querySelector(".modal")
  new bootstrap.Modal(modal).show()
  modal.querySelector("h5").innerText = `NO.${index + 1}　${item.id} - ${
    item.name
  }`
  modal.querySelector(
    "img"
  ).src = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${item.id}_0.jpg`
  modal.querySelector("img").classList.add("img-fluid", "rounded", "mb-3")
  modal.querySelector("p").innerHTML = `HP：${item.stats.hp}<br>
  Move Speed：${item.stats.movespeed}<br>
  Armor：${item.stats.armor}<br>
  Spell Block：${item.stats.spellblock}<br>
  Attack Range：${item.stats.attackrange}<br>`
  modal.querySelector("p").classList.add("lh-lg")
}
