function addIncItemListener(cards)
{
    cards.forEach((item,ind) => {
        let cardElem = document.querySelectorAll(`.available__card.card`)[ind]
        let incBtn = cardElem.getElementsByClassName("counter__inc")[0]
        incBtn.addEventListener("click", () => incItem(cardElem, item.left))
    })
}
function incItem(card, left) {
    let num = card.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    if(curNum == left) return;
    if(curNum+1 == left) {
        card.querySelector(".counter__inc").classList.add("counter_color-disabled")
        card.querySelector(".counter__inc").classList.remove("color_black")

        card.querySelector(".left-amount").classList.add("color_orange")
        card.querySelector(".left-amount").classList.remove("color_red")
    }
    if(curNum == 1) {
        card.querySelector(".counter__dec").classList.remove("counter_color-disabled")
        card.querySelector(".counter__dec").classList.add("color_black")
    }
    num.innerText = curNum+1
}


function addDecItemListener(cards) 
{
    cards.forEach((item,ind) => {
        let cardElem = document.querySelectorAll(`.available__card.card`)[ind]
        let decBtn = cardElem.querySelector(".counter__dec")
        decBtn.addEventListener("click", () => decItem(cardElem, item.left))
    })
}
function decItem(card, left) {
    let num = card.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    card.querySelector(".left-amount").classList.remove("color_orange")
    card.querySelector(".left-amount").classList.add("color_red")

    if(curNum == 1) return;
    if(curNum > 1 && curNum <= left) num.innerText = curNum-1
    if(curNum == left) {
        card.querySelector(".counter__inc").classList.add("color_black")
        card.querySelector(".counter__inc").classList.remove("counter_color-disabled")
    }
    if(curNum == 2) {
        card.querySelector(".counter__dec").classList.add("counter_color-disabled")
        card.querySelector(".counter__dec").classList.remove("color_black")
    }
}


function addToggleFavoriteCardListener()
{
    const cardElems = document.querySelectorAll(`.card`)
    cardElems.forEach(elem => {
        const likeBtn = elem.querySelector(".actions__to-like")
        likeBtn.addEventListener("click", () => likeCard(elem))

        likeBtn.addEventListener("mouseover", () => {
            likeBtn.querySelector("img").attributes.src.value = "./icons/basket/to_like_hover.svg"
        })
        likeBtn.addEventListener("mouseout", () => {
            likeBtn.querySelector("img").attributes.src.value = "./icons/basket/to_like.svg"
        })
    })
}
function likeCard(card) {
    const card_id = Array.from(card.parentElement.children).map((el,ind)=>el==card ? ind:null).filter(ind => ind!=null)[0]
    const a_card  = document.querySelectorAll(`.available .card`)[card_id]
    const un_card = document.querySelectorAll(`.unavailable .card`)[card_id]
    
    toggleLike(a_card)
    toggleLike(un_card, true)
}
function toggleLike(elem, isChosen=false) {
    const likeNum = document.querySelector(".tab-favorites__num")
    const likes = Number(likeNum.textContent)

    const img = elem.querySelector(".actions__to-like img")
    const isLiked = (img.attributes.src.value.includes("to_like")) ? false : true
    if(isLiked) {
        img.attributes.src.value = "./icons/basket/to_like.svg"
        if(likes!=0   && !isChosen) likeNum.textContent = likes-1;
        if(likes-1==0 && !isChosen) {
            likeNum.classList.remove("display_f")
            likeNum.classList.add("display_n")
        }
    }
    else {
        img.attributes.src.value = "./icons/basket/liked.svg"
        likeNum.classList.add("display_f")
        likeNum.classList.remove("display_n")        

        if(isChosen) likeNum.textContent = likes+1
    }
}


function addDelCardListener(cards)
{
    cards.forEach(item => {
        const cardsElem = document.querySelectorAll(`.card`)
        cardsElem.forEach(card => {
            const delBtn = card.querySelector(".actions__to-basket")
            delBtn.addEventListener("click", () => delCard(card, item.id, cards))
            delBtn.addEventListener("mouseover", () => {
                delBtn.querySelector("img").attributes.src.value = "./icons/basket/to_basket_hover.svg"
            })
            delBtn.addEventListener("mouseout", () => {
                delBtn.querySelector("img").attributes.src.value = "./icons/basket/to_basket.svg"
            })
        })
    })
}
function delCard(card, index, cards) {
    cards = cards.filter(card => card.id != index)

    const card_id = Array.from(card.parentElement.children).map((elem,ind)=>elem==card ? ind:null).filter(ind => ind!=null)[0]
    const a_card  = document.querySelectorAll(`.available .card`)[card_id]
    const un_card = document.querySelectorAll(`.unavailable .card`)[card_id]
    a_card.remove()
    un_card.remove()

    const unavNum = document.getElementById("unavailable__products-list").childElementCount
    document.querySelector(".unavailable-header h4").innerText = `Отсутствуют · ${unavNum} товара`

    const cartNum = document.querySelectorAll(".tab-cart__num")
    cartNum.forEach(elem => {
        elem.innerText = unavNum
        if(unavNum == 0) elem.remove()
    })

}

