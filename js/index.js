const cards = [
    {name: 'Футболка UZcotton мужская'},
    {name: 'Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe',
    short: 'Силиконовый чехол картхолдер (отверстия) для'},
    {name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    short: 'Карандаши цветные Faber-Castell "Замок", набор 24 цв'}
]

function onResize() 
{
    if(window.innerWidth >= 1024) {
        Array.from(document.querySelectorAll(".unavailable__card-name")).forEach(element => {
            element.classList.remove("card-description_font")
            element.classList.add("text_font")
        });
    
        Array.from(document.querySelectorAll(".size")).forEach(element => {
            element.style.visibility = "hidden";
        })

        Array.from(document.querySelectorAll(".bg-color_smoky-dark")).forEach(element => {
            element.classList.remove("bg-color_smoky-dark")
            element.classList.add("main_bg-color-primary")
        })

        let available__card = Array.from(document.querySelectorAll(".available__card-name"))
        let unavailable__card = Array.from(document.querySelectorAll(".unavailable__card-name"))
        cards.forEach((card, index) => {
            if(available__card[index].innerText == card.name) return;
            else {
                available__card[index].innerText = card.name;
                unavailable__card[index].innerText = card.name;
            }
        })
    } else {
        Array.from(document.querySelectorAll(".unavailable__card-name")).forEach(element => {
            element.classList.remove("text_font")
            element.classList.add("card-description_font")
        });
    
        Array.from(document.querySelectorAll(".size")).forEach(element => {
            element.style.visibility = "visible";
        })

        Array.from(document.querySelectorAll(".bg-color_smoky-dark")).forEach(element => {
            element.classList.remove("main_bg-color-primary")
            element.classList.add("bg-color_smoky-dark")
        })

        let available__card = Array.from(document.querySelectorAll(".available__card-name"))
        let unavailable__card = Array.from(document.querySelectorAll(".unavailable__card-name"))
        cards.forEach((card, index) => {
            if(card.short) {
                available__card[index].innerText   = card.short+"..."
                unavailable__card[index].innerText = card.short+"..."
            }
        })
    }
}

document.addEventListener("DOMContentLoaded", onResize)
window.addEventListener("resize", onResize)


document.getElementById("selectAll").addEventListener("click", (main) => {
    Array.from(document.getElementsByClassName("available__card-checkbox")).forEach((element) => {
        element.checked = main.target.checked;
    })
})


document.getElementById("collapseAvailable").addEventListener("click", (el) => {
    let list = document.getElementById("available__products-list")
    if (list.style.display != 'none') {
        list.style.display = 'none'
        el.target.style.transform = 'rotate(180deg)'
    } else {
        list.style.display = 'block'
        el.target.style.transform = 'rotate(0deg)'
    }
})

document.getElementById("collapseUnavailable").addEventListener("click", (el) => {
    let list = document.getElementById("unavailable__products-list")
    if (list.style.display != 'none') {
        list.style.display = 'none'
        el.target.style.transform = 'rotate(180deg)'
    } else {
        list.style.display = 'block'
        el.target.style.transform = 'rotate(0deg)'
    }
})