//宣告
//今天
const today = new Date()
//年、月、日
let year = today.getFullYear()
let month = today.getMonth()
//let date=today.getDate()

//DOM
const yearMonthText = document.querySelector(".year-month")
const dateArea = document.querySelector("tbody")

const addModal = document.querySelector("#add-event-modal")
const editModal = document.querySelector("#edit-event-modal")

const addDateInput = document.querySelector("#add-date")
const addValueInput = document.querySelector("#add-value")
const editDateInput = document.querySelector("#edit-date")
const editValueInput = document.querySelector("#edit-value")

//window.onload
window.onload = function () {
  initCalendar()
}

//function
function initCalendar() {
  dateArea.innerHTML = ""

  yearMonthText.innerText = `${year}年 - ${month + 1}月`

  //這個月第一天星期幾
  let firstDay = new Date(year, month, 1).getDay()
  //這個月有幾天
  let dayOfMonth = new Date(year, month + 1, 0).getDate()

  let day = 1
  let rows = Math.ceil((dayOfMonth + firstDay) / 7)

  for (let row = 0; row < rows; row++) {
    let tr = document.createElement("tr")
    for (let col = 0; col < 7; col++) {
      let td = document.createElement("td")
      if (row == 0 && col < firstDay) {
        //上個月
        //td.innerText = "上個月"
      } else {
        if (day <= dayOfMonth) {
          //這個月
          td.innerText = day

          if (localStorage.getItem(`${year} - ${month + 1} - ${day}`) != null) {
            let ul = document.createElement("ul")
            let todoList = JSON.parse(
              localStorage.getItem(`${year} - ${month + 1} - ${day}`)
            )
            todoList.forEach((item, index) => {
              let li = document.createElement("li")
              li.innerText = item.title

              li.onclick = function (event) {
                bootstrap.Modal.getOrCreateInstance(editModal).show()
                currentIndex = index
                editDateInput.value = `${year} - ${month + 1} - ${
                  td.childNodes[0].data
                }`
                event.stopPropagation()
              }
              ul.appendChild(li)
            })
            td.appendChild(ul)
          }
          td.onclick = function () {
            bootstrap.Modal.getOrCreateInstance(addModal).show()
            addDateInput.value = `${year} - ${month + 1} - ${
              td.childNodes[0].data
            }`
          }
        } else {
          //下個月
          //td.innerText = "下個月"
        }
        day++
      }
      tr.appendChild(td)
    }
    dateArea.appendChild(tr)
  }
}

function previousMonth() {
  month--
  if (month == -1) {
    year--
    month = 11
  }
  initCalendar()
}

function nextMonth() {
  month++
  if (month == 12) {
    year++
    month = 0
  }
  initCalendar()
}

function addTodoItem() {
  let date = addDateInput.value
  let todoItem = addValueInput.value

  let todoObj = {
    title: todoItem,
  }
  let todoList = []
  if (localStorage.getItem(date) == null) {
    todoList.push(todoObj)
  } else {
    todoList = JSON.parse(localStorage.getItem(date))
    todoList.push(todoObj)
  }
  localStorage.setItem(date, JSON.stringify(todoList))

  bootstrap.Modal.getOrCreateInstance(addModal).hide()
  initCalendar()
}

function editTodoItem() {
  let date = editDateInput.value
  let todoItem = editValueInput.value

  todoList = JSON.parse(localStorage.getItem(date))
  todoList[currentIndex] = { title: todoItem }

  localStorage.setItem(date, JSON.stringify(todoList))
  bootstrap.Modal.getOrCreateInstance(editModal).hide()
  initCalendar()
}

function deleteTodoItem() {
  let date = editDateInput.value
  let todoList = JSON.parse(localStorage.getItem(date))
  todoList.splice(currentIndex, 1)
  localStorage.setItem(date, JSON.stringify(todoList))

  bootstrap.Modal.getOrCreateInstance(editModal).hide()
  initCalendar()
}
