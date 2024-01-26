function addIncItemListener(cards)
{
    cards.forEach((item,ind) => {
        let cardElem = document.querySelectorAll(`.available__card.card`)[ind]
        let incBtn = cardElem.getElementsByClassName("counter__inc")[0]
        incBtn.addEventListener("click", () => incItem(cardElem, item.left, ind))
    })
}
function incItem(card, left, ind) {
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
    incPrice(ind)
}
function incPrice(id) {
    let items = JSON.parse(localStorage.getItem("L0_itemsQuantity"))
    items.cards = items.cards.map(card => {if(card.id == id) {
            card.quantity += 1;
            card.total_price = formedStrToNum(card.item_price) * card.quantity;
        }; return card;
    })
    localStorage.setItem("L0_itemsQuantity", JSON.stringify(items))
    changePrices(id, items)
}


function addDecItemListener(cards) 
{
    cards.forEach((item,ind) => {
        let cardElem = document.querySelectorAll(`.available__card.card`)[ind]
        let decBtn = cardElem.querySelector(".counter__dec")
        decBtn.addEventListener("click", () => decItem(cardElem, item.left, ind))
    })
}
function decItem(card, left, ind) {
    let num = card.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    card.querySelector(".left-amount").classList.remove("color_orange")
    card.querySelector(".left-amount").classList.add("color_red")

    if(curNum-1 == 0) return;
    if(curNum > 1 && curNum <= left) {
        num.innerText = curNum-1
        decPrice(ind)
    }
    if(curNum == left) {
        card.querySelector(".counter__inc").classList.add("color_black")
        card.querySelector(".counter__inc").classList.remove("counter_color-disabled")
    }
    if(curNum == 2) {
        card.querySelector(".counter__dec").classList.add("counter_color-disabled")
        card.querySelector(".counter__dec").classList.remove("color_black")
    }
}
function decPrice(id) {
    let items = JSON.parse(localStorage.getItem("L0_itemsQuantity"))
    items.cards = items.cards.map(card => {if(card.id == id) {
            card.quantity -= 1;
            card.total_price = formedStrToNum(card.item_price) * card.quantity;
        }; return card;
    })
    localStorage.setItem("L0_itemsQuantity", JSON.stringify(items))
    changePrices(id, items)
}


function changePrices(id, items, isDel = false) {
    if(!isDel) changeItemPrice(id, items)

    const total = changeTotalPrice(items)
    const prev_total = changePrevTotalPrice(items)
    changeTotalQuantity(items)
    changeDiscount(total, prev_total)

    if (document.querySelector("#pay-immediately").checked) changeTotalBtnText()
}
function changeItemPrice(ind, items) {
    const id = items.cards.map((card,id) => (card.id == ind) ? id : null).filter(id => id != null)[0]
    const item_total = countItemTotalPrice(items.cards[id].total_price, items.cards[id].quantity)
    document.querySelectorAll('.available__card')[id]
            .querySelectorAll(".available__price-value span").forEach(elem => elem.textContent = item_total)
}
function changeTotalPrice(items) {
    const total = items.cards.map(card => card.total_price).reduce((count, price)=> count + price)
    document.querySelector(".total__price-total span span").textContent = numToFormedStr(total)

    return formedStrToNum(total)
}
function changePrevTotalPrice(items) {
    const prev_totals = items.cards.map(card => countItemTotalPrice(card.prev_item_price, card.quantity))
    let total_prev = prev_totals.reduce((count, price) => formedStrToNum(count) + formedStrToNum(price))
    total_prev = numToFormedStr(total_prev)
    document.querySelector(".total__price-point .total__price-tag").textContent = `${total_prev}`

    prev_totals.forEach((price,index) => {
        document.querySelectorAll(".available__card")[index]
        .querySelectorAll(".available__prev-cost").forEach(prev_price => {
            prev_price.getElementsByClassName("available__prev-cost-tag")[0].textContent = `${price}`
        })
    })

    return formedStrToNum(total_prev)
}
function changeTotalQuantity(items) {
    const quantity = items.cards.map(card => card.quantity).reduce((count, num) => count + num)
    document.querySelector(".total__price-point span").textContent = `${quantity} ${formProd(quantity)}`
}
function changeDiscount(totalPrice, prevTotalPrice) {
    const discount = numToFormedStr(prevTotalPrice - totalPrice).trim()
    document.querySelector(".total__price-discount").textContent = `−${discount}`
}


function formProd(quantity) {
    const num = quantity%100;
    if(Math.floor(num/10) != 1 && num%10 == 1) return 'товар';
    if(Math.floor(num/10) != 1 && [2,3,4].includes(num%10)) return 'товара';
    return 'товаров';
}
function formedStrToNum(formedStr) {
    if(typeof formedStr == "string" && formedStr.includes(' ')) {
        formedStr = formedStr.split(' ')
        formedStr = formedStr.join('')
        formedStr = Number(formedStr)
    }
    return  formedStr;
}
function numToFormedStr(num) {
    let cost = String(num)
    let fraction = cost.includes('.') ? '.'+Number(cost).toFixed(2).split('.')[1] : null
    fraction = (fraction == ".00") ? null : fraction
    cost = Array.from(cost.split('.')[0])
                .reverse().map((num, ind) => ((ind+1) % 3 == 0) ? ` ${num}` : num)
                .reverse().join('')
    return cost + (fraction || '')
}
function countItemTotalPrice(itemCost, quantity) {
    let cost = (typeof itemCost == "number") ? String(itemCost) : String(itemCost.split(" ").join('') * quantity)
    let fraction = cost.includes('.') ? '.'+Number(cost).toFixed(2).split('.')[1] : null
    fraction = (fraction == ".00") ? null : fraction
    cost = Array.from(cost.split('.')[0])
                .reverse().map((num, ind) => ((ind+1) % 3 == 0) ? ` ${num}` : num)
                .reverse().join('')
    return cost + (fraction || '')
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
        cardsElem.forEach(cardElem => {
            const delBtn = cardElem.querySelector(".actions__to-basket")
            delBtn.addEventListener("click", () => delCard(cardElem, item.id, cards))
            delBtn.addEventListener("mouseover", () => {
                delBtn.querySelector("img").attributes.src.value = "./icons/basket/to_basket_hover.svg"
            })
            delBtn.addEventListener("mouseout", () => {
                delBtn.querySelector("img").attributes.src.value = "./icons/basket/to_basket.svg"
            })
        })
    })
}
function delCard(cardElem, index, cards) {
    cards = cards.filter(card => card.id != index)

    const card_id = Array.from(cardElem.parentElement.children).map((elem,ind)=>elem==cardElem ? ind:null).filter(ind => ind!=null)[0]
    const a_card  = document.querySelectorAll(`.available .card`)[card_id]
    const un_card = document.querySelectorAll(`.unavailable .card`)[card_id]
    a_card.remove()
    un_card.remove()
    removeProdPrice(card_id)

    const unavNum = document.getElementById("unavailable__products-list").childElementCount
    document.querySelector(".unavailable-header h4").innerText = `Отсутствуют · ${unavNum} товара`

    const cartNum = document.querySelectorAll(".tab-cart__num")
    cartNum.forEach(elem => {
        elem.innerText = unavNum
        if(unavNum == 0) elem.remove()
    })

}
function removeProdPrice(id) {
    let items = JSON.parse(localStorage.getItem("L0_itemsQuantity"))
    items.cards = items.cards.filter((card,i) => i != id)
    
    localStorage.setItem("L0_itemsQuantity", JSON.stringify(items))

    changePrices(id, items, true)
}
