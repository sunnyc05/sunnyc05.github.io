//宣告
let inputTodo
let currentIndex

//DOM
const inputBox = document.querySelector("input")
const addBtn = document.querySelector("button.add")
const todoUl = document.querySelector("ul.todo-list")

//window.onload
window.onload = function () {
  createTodo()

  addBtn.addEventListener("click", function () {
    getInput()
    addLocal()
  })
  inputBox.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      getInput()
      addLocal()
    }
  })
}

//function
function getInput() {
  if (inputBox.value != "") {
    inputTodo = inputBox.value
  }
  inputBox.value = ""
}
function createTodo() {
  todoUl.innerHTML = ""
  if (localStorage.getItem("userTodo") != null) {
    let valueList = JSON.parse(localStorage.getItem("userTodo"))
    valueList.forEach((valueItem, index) => {
      let todoLi = document.createElement("li")
      todoLi.classList.add("input-group", "my-2")
      todoUl.appendChild(todoLi)

      let div = document.createElement("div")
      div.classList.add("input-group-text")
      todoLi.appendChild(div)

      let checkbox = document.createElement("input")
      checkbox.classList.add("form-check-input", "mt-0")
      checkbox.setAttribute("type", "checkbox")
      checkbox.ariaLabel = "Checkbox for following text input"
      checkbox.checked = valueItem.check
      div.appendChild(checkbox)
      checkbox.addEventListener("click", function () {
        currentIndex = index
        saveLocal()
      })

      let inputText = document.createElement("input")
      inputText.classList.add("form-control", "todo-item")
      inputText.ariaLabel = "Text input with checkbox"
      inputText.value = valueItem.text
      inputTodo = undefined
      inputText.disabled = true
      todoLi.appendChild(inputText)

      let edBtn = document.createElement("button")
      edBtn.classList.add("btn", "btn-warning", "edit", "px-3")
      edBtn.setAttribute("type", "button")
      edBtn.innerText = "編輯"
      todoLi.appendChild(edBtn)
      edBtn.addEventListener("click", editBtn)

      let saBtn = document.createElement("button")
      saBtn.classList.add("btn", "btn-success", "save", "px-3", "d-none")
      saBtn.setAttribute("type", "button")
      saBtn.innerText = "保存"
      todoLi.appendChild(saBtn)
      saBtn.addEventListener("click", function () {
        currentIndex = index
        saveBtn()
        saveLocal()
      })

      let delBtn = document.createElement("button")
      delBtn.classList.add("btn", "btn-danger", "delete", "px-3")
      delBtn.setAttribute("type", "button")
      delBtn.innerText = "刪除"
      todoLi.appendChild(delBtn)
      delBtn.addEventListener("click", function () {
        currentIndex = index
        deleteLocal()
      })
    })
  }
}
function editBtn() {
  event.target.parentNode.querySelector("input.todo-item").disabled = false
  event.target.nextSibling.classList.remove("d-none")
  event.target.classList.add("d-none")
}
function saveBtn() {
  event.target.parentNode.querySelector("input.todo-item").disabled = true
  event.target.previousSibling.classList.remove("d-none")
  event.target.classList.add("d-none")
}

function addLocal() {
  if (inputTodo != undefined) {
    let valueList = []
    let valueItem = {
      check: false,
      text: inputTodo,
    }
    if (localStorage.getItem("userTodo") == null) {
      valueList.push(valueItem)
    } else {
      valueList = JSON.parse(localStorage.getItem("userTodo"))
      valueList.push(valueItem)
    }
    localStorage.setItem("userTodo", JSON.stringify(valueList))
    createTodo()
  }
}
function saveLocal() {
  let valueItem = {
    check: document
      .querySelectorAll("li")
      [currentIndex].querySelector(".form-check-input").checked,
    text: document
      .querySelectorAll("li")
      [currentIndex].querySelector("input.todo-item").value,
  }
  let valueList = JSON.parse(localStorage.getItem("userTodo"))
  valueList[currentIndex] = valueItem
  localStorage.setItem("userTodo", JSON.stringify(valueList))
  //createTodo()
}
function deleteLocal() {
  let valueList = JSON.parse(localStorage.getItem("userTodo"))
  valueList.splice(currentIndex, 1)
  localStorage.setItem("userTodo", JSON.stringify(valueList))
  createTodo()
}
