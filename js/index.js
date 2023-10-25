let cards;
let card_names = [];

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
        card_names.forEach((card, index) => {
            if(available__card[index].innerText == card.full) return;
            else {
                available__card[index].innerText = card.full;
                unavailable__card[index].innerText = card.full;
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
        card_names.forEach((card, index) => {
            if(card.short) {
                available__card[index].innerText   = card.short+"..."
                unavailable__card[index].innerText = card.short+"..."
            }
        })
    }
}

function addIncItemListener() 
{
    cards.forEach(item => {
        let cardElems = document.querySelector(`.available__card.card-${item.id}`)
        let incBtn = cardElems.getElementsByClassName("counter__inc")[0]
        incBtn.addEventListener("click", () => incItem(cardElems, item.left))
    })
}
function incItem(elem, left) {
    let num = elem.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    if(curNum == left) return
    if(curNum+1 == left) elem.querySelector(".counter__inc").style.color = "rgba(0, 0, 0, 0.2)"
    if(curNum+1 == 2) elem.querySelector(".counter__dec").style.color = "rgba(0, 0, 0, 1)"
    num.innerText = curNum+1
}

function addDecItemListener() 
{
    cards.forEach(item => {
        let cardElems = document.querySelector(`.available__card.card-${item.id}`)
        let decBtn = cardElems.querySelector(".counter__dec")
        decBtn.addEventListener("click", () => decItem(cardElems, item.left))
    })
}
function decItem(elem, left) {
    let num = elem.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    if(curNum > 1) num.innerText = curNum-1
    if(curNum == 1) elem.querySelector(".counter__dec").style.color = "rgba(0, 0, 0, 0.2)"
    if(curNum == left) elem.querySelector(".counter__inc").style.color = "rgba(0, 0, 0, 1)"
}

function addToggleFavoriteCardListener() 
{
    cards.forEach(item => {
        const cardElems = document.getElementsByClassName(`card-${item.id}`)
        Array.from(cardElems).forEach(elem => {
            const likeBtn = elem.querySelector(".actions__to-like")
            likeBtn.addEventListener("click", () => likeCard(Array.from(cardElems)))
        })
    })
}
function likeCard(cardElems) {
    const likeNum = document.getElementsByClassName("tab-favorites__num")
    const likes = Number(Array.from(likeNum)[0].innerText)
    Array.from(likeNum).forEach(elem => elem.style.display = 'flex')
    
    cardElems.forEach(elem => {
        const img = elem.querySelector(".actions__to-like img")
        const isLiked = (img.attributes.src.value.includes("to_like")) ? false : true
        if(isLiked) {
            img.attributes.src.value = "/icons/basket/to_like.svg"
            if(likes!=0) Array.from(likeNum).forEach(elem => elem.innerText = likes-1)
            if(likes-1==0) Array.from(likeNum).forEach(elem => elem.style.display = 'none')
        }
        else {
            img.attributes.src.value = "/icons/basket/liked.svg"            
            Array.from(likeNum).forEach(elem => elem.innerText = likes+1)
        }
    })
}

function addDelCardListener() 
{
    cards.forEach(item => {
        const card = document.getElementsByClassName(`card-${item.id}`)
        Array.from(card).forEach(elem => {
            const delBtn = elem.querySelector(".actions__to-basket")
            delBtn.addEventListener("click", () => delCard(Array.from(card), item.id))
        })
    })
}
function delCard(elems, index) {
    cards = cards.filter(card => card.id != index)
    // fetch("", {method: POST, headers: {'Content-Type': 'application/json'} body: JSON.stringify(cards)})

    elems.forEach(elem => elem.remove())

    const unavNum = document.getElementById("unavailable__products-list").childElementCount
    document.querySelector(".unavailable-header h4").innerText = `Отсутствуют · ${unavNum} товара`

    const cartNum = document.getElementsByClassName("tab-cart__num")
    Array.from(cartNum).forEach(elem => {
        elem.innerText = unavNum
        if(unavNum == 0) elem.remove()
    })

}


fetch('/json/data.json')
    .then(response => response.json())
    .then(data => {
        data.cards.forEach(card => {
            card_names.push(card.name)
        })
        cards = data.cards
    }).then(() => {
        onResize()

        addDelCardListener()
        addToggleFavoriteCardListener()

        addIncItemListener()
        addDecItemListener()
    })
    .catch(error => console.log(error))
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