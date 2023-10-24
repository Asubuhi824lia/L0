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