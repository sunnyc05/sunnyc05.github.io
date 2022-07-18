//宣告
const productList = [
  {
    name: "iPhone 13",
    price: 22900,
    mainImg:
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-mini-family-select?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=90&amp;.v=1645036276899",
    colorList: [
      {
        name: "綠色",
        color: "#435442",
        img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-green-select?wid=470&hei=556&fmt=png-alpha&.v=1645036275538",
      },
      {
        name: "粉色",
        color: "#FBE2DD",
        img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-pink-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572315935",
      },
      {
        name: "藍色",
        color: "#437691",
        img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-blue-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572386470",
      },
      {
        name: "黑色",
        color: "#43484E",
        img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-midnight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572315913",
      },
      {
        name: "白色",
        color: "#FBF7F4",
        img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-starlight-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572315205",
      },
      {
        name: "紅色",
        color: "#C92233",
        img: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-13-product-red-select-2021?wid=470&hei=556&fmt=png-alpha&.v=1645572315758",
      },
    ],
    spec: [
      {
        name: "機型",
        specDetail: [
          { name: "5.4吋", fit: 0 },
          { name: "6.1吋", fit: 3000 },
        ],
      },
      {
        name: "容量",
        specDetail: [
          { name: "128GB", fit: 0 },
          { name: "256GB", fit: 3500 },
          { name: "512GB", fit: 10500 },
        ],
      },
    ],
  },
]

//DOM
const navbar = document.querySelector(".nav-bar")
const productType = document.querySelector(".product-type")
const priceTop = document.querySelector(".price-top")
const productName = document.querySelector(".product-name")
const productImg = document.querySelector(".product-img")

const colorAreaBtn = document.querySelector(
  '[aria-controls="panelsStayOpen-color"]'
)
const colorArea = document.querySelector(".color-area")

const accordionBox = document.querySelector(".accordion")

//window.onload
window.onload = function () {
  showNavBar()
  selectProduct(productList[0])
}

//function
function showNavBar() {
  const list = productList.map((p) => p.name)
  list.forEach((p, index) => {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.innerText = p
    a.href = `#${p}`
    a.classList.add("btn", "btn-dark", "product")
    a.onclick = function () {
      selectProduct(productList[index])
    }

    li.appendChild(a)
    navbar.appendChild(li)
  })
}

function selectProduct(product) {
  productType.innerText = product.name
  productName.innerText = product.name
  productImg.src = product.mainImg
  priceTop.innerText = `$ ${product.price}`
  //color
  product.colorList.forEach((item) => {
    const div = document.createElement("div")
    div.classList.add("col-6", "mb-3")
    const btn = document.createElement("button")
    btn.classList.add("btn", "color-btn", "w-100")
    btn.onclick = function () {
      productImg.src = item.img

      colorAreaBtn.innerText = item.name
      colorAreaBtn.click()
    }

    const btnDiv = document.createElement("div")
    btnDiv.classList.add(
      "py-4",
      "d-flex",
      "flex-column",
      "justify-content-center",
      "align-items-center"
    )

    const i = document.createElement("i")
    i.classList.add("fas", "fa-circle")
    i.style.color = item.color
    const span = document.createElement("span")
    span.innerText = item.name
    span.classList.add("color-name")

    btnDiv.appendChild(i)
    btnDiv.appendChild(span)
    btn.appendChild(btnDiv)
    div.appendChild(btn)
    colorArea.appendChild(div)
  })
  product.spec.forEach((item) => {
    const accordionItem = document.createElement("div")
    accordionItem.classList.add("accordion-item")
    const accordionTitle = document.createElement("h2")
    accordionTitle.classList.add("accordion-header")
    const accordionBtn = document.createElement("button")
    accordionBtn.innerText = item.name
    accordionBtn.classList.add("accordion-button")
    accordionBtn.setAttribute("type", "button")
    accordionBtn.setAttribute("data-bs-toggle", "collapse")
    accordionBtn.setAttribute("data-bs-target", `#panelsStayOpen-${item.name}`)
    accordionBtn.setAttribute("aria-expanded", "true")
    accordionBtn.setAttribute("aria-controls", `#panelsStayOpen-${item.name}`)

    accordionTitle.appendChild(accordionBtn)

    const accordionContent = document.createElement("div")
    accordionContent.setAttribute("id", `panelsStayOpen-${item.name}`)
    accordionContent.classList.add("accordion-collapse", "collapse", "show")
    const accordionBody = document.createElement("div")
    accordionBody.classList.add("accordion-body")
    const h5 = document.createElement("h5")
    const strong = document.createElement("strong")
    strong.innerText = item.name
    h5.appendChild(strong)

    const specDiv = document.createElement("div")
    specDiv.classList.add("row")
    item.specDetail.forEach((specItem) => {
      const div = document.createElement("div")
      div.classList.add("col-6", "mb-3")
      const btn = document.createElement("button")
      btn.classList.add("btn", "fit-btn", "w-100")
      btn.setAttribute("fit", specItem.fit)
      btn.setAttribute("selected", "false")
      btn.onclick = function () {
        specDiv.querySelectorAll(".btn").forEach((b) => {
          b.setAttribute("selected", "false")
        })
        btn.setAttribute("selected", "true")
        showPrice(product)

        accordionBtn.innerText = specItem.name
        accordionBtn.click()
      }

      const btnDiv = document.createElement("div")
      btnDiv.classList.add(
        "py-4",
        "d-flex",
        "flex-column",
        "justify-content-center",
        "align-items-center"
      )

      const p = document.createElement("p")
      p.classList.add("spec-val", "m-0")
      p.innerText = specItem.name
      const span = document.createElement("span")
      span.classList.add("fit")
      span.innerText = `NT $${product.price + specItem.fit}`
      btnDiv.appendChild(p)
      btnDiv.appendChild(span)
      btn.appendChild(btnDiv)
      div.appendChild(btn)
      specDiv.appendChild(div)
    })
    accordionBody.appendChild(h5)
    accordionBody.appendChild(specDiv)
    accordionContent.appendChild(accordionBody)
    accordionItem.appendChild(accordionTitle)
    accordionItem.appendChild(accordionContent)
    accordionBox.appendChild(accordionItem)
  })

  function showPrice(product) {
    const selectedFits = Array.from(
      document.querySelectorAll("[fit][selected='true']")
    )
    const money =
      selectedFits.length > 0
        ? selectedFits
            .map((x) => parseInt(x.getAttributeNode("fit").value))
            .reduce((a, b) => a + b)
        : 0

    priceTop.innerText = `$ ${product.price + money}`
  }
}
