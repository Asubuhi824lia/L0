fetch('../json/data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // поместить в localStorage динамические параметры товаров
        localStorage.setItem("L0_itemsQuantity", JSON.stringify(
            {cards: data.cards.map(card => ({
                id:         card.id, 
                quantity:   card.quantity, 
                item_price: card.cost, 
                prev_item_price:card.prev_cost,
                total_price:    card.cost.replace(" ", '') * card.quantity
            }))}
        ))

        // сформировать и вывести карточки товаров
        data.cards.forEach(card => {
            document.querySelector("#available__products-list").appendChild(createAvailableCard(card))
            document.querySelector("#unavailable__products-list").appendChild(createUnavailableCard(card))
        });

        addIncItemListener(data.cards)
        addDecItemListener(data.cards)
        addToggleFavoriteCardListener(data.cards)
        addDelCardListener(data.cards)

        onResize()
    })


function createAvailableCard(objCard) {
    const template = document.querySelector("#available__cardTemp").content.cloneNode(true)
    
    template.querySelector(".available__card-left img").setAttribute("src", objCard.img)
    const cardPrefix = "available__card"
    setBaseCardInfo(template,cardPrefix, objCard)

    template.querySelector(".available__card-location").textContent = objCard.warehouse
    template.querySelector(".available__card-company span").textContent = objCard.firm
    setItemSize(template, objCard)
    createFirmTooltip(objCard.firm, template.querySelector(".available__card-company img"))

    setCounter(template, objCard)
    setPrice(template, objCard)

    return template;
}
function createUnavailableCard(objCard) {
    const template = document.querySelector("#unavailable__cardTemp").content.cloneNode(true)

    template.querySelector(".unavailable__card-left img").setAttribute("src", objCard.img_mono)
    const cardPrefix = "unavailable__card"
    setBaseCardInfo(template,cardPrefix, objCard)
    
    return template;
}

/**
 * @param {Node} template 
 * @param {String} cardPrefix 
 * @param {Object} objCard 
 */
function setBaseCardInfo(template, cardPrefix, objCard) {
    template.querySelector( `.${cardPrefix}-name`).textContent = objCard.name.full
    template.querySelector( `.${cardPrefix}-apps`).textContent = ''
    objCard.apps.forEach(app => {
        const appTemp = document.querySelector("#paramTemp").content.cloneNode(true)
              appTemp.querySelector("span").textContent = app
        template.querySelector(`.${cardPrefix}-apps`).appendChild(appTemp)
    })
}
function setItemSize(template, objCard) {
    const   sizeTemp = document.querySelector("#sizeTemp").content.cloneNode(true)
            sizeTemp.querySelector("span").textContent = objCard.size
    template.querySelector(".available__card-left").append(sizeTemp)
}
function setCounter(template, objCard) {
    template.querySelector(".counter__num").textContent = objCard.quantity
    if(objCard.quantity == 1) template.querySelector(".counter__dec").classList.add("counter_color-disabled")
    if(objCard.quantity == objCard.left) template.querySelector(".counter__inc").classList.add("counter_color-disabled")

    if(objCard.left < 3) template.querySelector(".left-amount").textContent = `Осталось ${objCard.left} шт.`
    if(objCard.left == objCard.quantity) {
        template.querySelector(".left-amount").classList.add("color_orange")
        template.querySelector(".left-amount").classList.remove("color_red")
    }
}
function setPrice(template, objCard) {
    template.querySelectorAll(".available__price-value span").forEach(span => {
        span.textContent = countItemTotalPrice(objCard.cost, objCard.quantity)
        if(objCard.cost.length > 7) {
            span.classList.add("subtitle-accent_font")
            span.classList.remove("litle-price_font")
        }
    }) 
    template.querySelectorAll(".available__price-value h4").forEach(h => {
        h.textContent = objCard.cy
    })
    template.querySelectorAll(".available__prev-cost").forEach(span => {
        span.getElementsByClassName("available__prev-cost-tag")[0].textContent = countItemTotalPrice(objCard.prev_cost, objCard.quantity)
        span.getElementsByClassName("available__prev-cost-cy")[0].textContent = objCard.cy
    })

    return template
}
function createFirmTooltip(firm, infoElem) {
    firm = firm.toUpperCase().split(' ')
    const tooltip = `
        <b>${firm[0]} «${firm[1]}»</b><br>
        <div style='margin: 8px 0;'>ОГРН: 5167746237148</div>
        129337, Москва, улица Красная Сосна, 2,<br> 
        корпус 1, стр. 1, помещение 2, офис 34"
    `
    infoElem.setAttribute("data-tooltip", tooltip)
}