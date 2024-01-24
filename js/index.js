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
// let card_names = [];


// fetch('./json/data.json')
//     .then(response => response.json())
//     .then(data => {
//         data.cards.forEach(card => {
//             card_names.push(card.name)
//         })
//         cards = data.cards
//     }).then(() => {
//         onResize()

//         addDelCardListener()
//         addToggleFavoriteCardListener()

//         addIncItemListener()
//         addDecItemListener()
//     })
//     .catch(error => console.log(error))

cards.forEach(card => {
    card_names.push(card.name)
})


onResize()

// addDelCardListener()
// addToggleFavoriteCardListener()

// addIncItemListener()
// addDecItemListener()

window.addEventListener("resize", onResize)



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