fetch('../json/data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        // поместить в localStorage динамические параметры товаров
        localStorage.setItem("L0_itemsQuantity", JSON.stringify(
            {cards: data.cards.map(card => ({
                id: card.id, 
                quantity: card.quantity, 
                item_price: card.cost, 
                prev_item_price: card.prev_cost,
                total_price: card.cost.replace(" ", '') * card.quantity
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

    const sizeTemp = document.querySelector("#sizeTemp").content.cloneNode(true)
          sizeTemp.querySelector("span").textContent = objCard.size
    template.querySelector(".available__card-left").append(sizeTemp)

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

    template.querySelector(".available__card-name").textContent = objCard.name.full

    template.querySelector(".available__card-apps").textContent=''
    objCard.apps.forEach(app => {
        const appTemp = document.querySelector("#paramTemp").content.cloneNode(true)
              appTemp.querySelector("span").textContent = app
        template.querySelector(".available__card-apps").appendChild(appTemp)
    })
    
    template.querySelector(".available__card-location").textContent = objCard.warehouse
    template.querySelector(".available__card-company span").textContent = objCard.firm

    if(objCard.left < 3) template.querySelector(".left-amount").textContent = `Осталось ${objCard.left} шт.`
    if(objCard.left == objCard.quantity) {
        template.querySelector(".left-amount").classList.add("color_orange")
        template.querySelector(".left-amount").classList.remove("color_red")
    }

    template.querySelector(".counter__num").textContent = objCard.quantity
    if(objCard.quantity == 1) template.querySelector(".counter__dec").classList.add("counter_color-disabled")
    if(objCard.quantity == objCard.left) template.querySelector(".counter__inc").classList.add("counter_color-disabled")

    template.querySelector(".actions__to-basket img").setAttribute("width", "20px")
    template.querySelector(".actions__to-basket img").setAttribute("height", "20px")

    return template;
}
function createUnavailableCard(objCard) {
    const template = document.querySelector("#unavailable__cardTemp").content.cloneNode(true)
    template.querySelector(".unavailable__card-left img").setAttribute("src", objCard.img_mono)

    template.querySelector(".unavailable__card-name").textContent = objCard.name.full

    template.querySelector(".unavailable__card-apps").textContent=''
    objCard.apps.forEach(app => {
        const appTemp = document.querySelector("#paramTemp").content.cloneNode(true)
              appTemp.querySelector("span").textContent = app
        template.querySelector(".unavailable__card-apps").appendChild(appTemp)
    })

    return template;
}

function countItemTotalPrice(itemCost, quantity) {
    let cost = (typeof itemCost == "number") ? String(itemCost) : String(itemCost.split(" ").join('') * quantity)
    const fraction = cost.includes('.') ? '.'+Number(cost).toFixed(2).split('.')[1] : null;
    cost = Array.from(cost.split('.')[0])
                .reverse().map((num, ind) => ((ind+1) % 3 == 0) ? ` ${num}` : num)
                .reverse().join('')
    return cost + (fraction || '');
}
