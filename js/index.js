let cards = [
    {
        id: 1,
        img: "./img/product1_preview.png", "size": "56",
        cost:"522", "cy":" сом", "prev_cost":"1051", "quantity": 1,
        name: {
            full: "Футболка UZcotton мужская",
            short: "Футболка UZcotton мужская"
        }, 
        apps:["Цвет: белый", "Размер: 56"], "warehouse":"Коледино WB", "firm": "OOO Вайлдберриз", "left": "2"
    },
    {
        id: 2,
        img: "./img/product2_preview.png", "size": "",
        cost:"2 100 047", "cy":" сом", "prev_cost":"2 300 047", "quantity": 200,
        name: {
            full: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
            short: "Силиконовый чехол картхолдер (отверстия) для"
        }, 
        apps:["Цвет: прозрачный"], "warehouse":"Коледино WB", "firm": "OOO Мегапрофстиль", "left": "230"
    },
    {
        id: 3,
        img: "./img/product3_preview.png", "size": "",
        cost:"494", "cy":" сом", "prev_cost":"950", "quantity": 2,
        name: {
            full: "Карандаши цветные Faber-Castell \"Замок\", набор 24 цвета, заточенные, шестигранные, Faber-Castell",
            short: "Карандаши цветные Faber-Castell \"Замок\", набор 24 цв"
        },
        apps:[""], "warehouse":"Коледино WB", "firm": "OOO Вайлдберриз", "left": "2"
    }
]

cards.forEach(card => {
    card_names.push(card.name)
})

onResize()


document.getElementById("selectAll").addEventListener("click", (main) => {
    document.querySelectorAll(".available__card-checkbox").forEach((element) => {
        element.checked = main.target.checked;
    })
})

document.getElementById("collapseAvailable").getElementsByTagName('img')[0].style.pointerEvents = "none";
document.getElementById("collapseUnavailable").getElementsByTagName('img')[0].style.pointerEvents = "none";

document.getElementById("collapseAvailable").addEventListener("click", (el) => {
    let list = document.getElementById("available__products-list")

    list.classList.toggle("display_n")
    list.classList.toggle("display_b")
    el.target.getElementsByTagName('img')[0].classList.toggle("transform_rotate_half")
    el.target.getElementsByTagName('img')[0].classList.toggle("transform_rotate_zero")
})
document.getElementById("collapseUnavailable").addEventListener("click", (el) => {
    let list = document.getElementById("unavailable__products-list")

    list.classList.toggle("display_n")
    list.classList.toggle("display_b")
    el.target.getElementsByTagName('img')[0].classList.toggle("transform_rotate_half")
    el.target.getElementsByTagName('img')[0].classList.toggle("transform_rotate_zero")
})

document.querySelector("#pay-immediately").addEventListener("click", (checkbox) => {
    if(checkbox.target.checked) 
        changeTotalBtnText()
    else 
        document.querySelector("#total__order").textContent = "Заказать"
})

function changeTotalBtnText() {
    let total = JSON.parse(localStorage.getItem("L0_itemsQuantity"))
        total = changeTotalPrice(total)
        total = numToFormedStr(total)
    document.querySelector("#total__order").textContent = `Оплатить ${total} com`
}