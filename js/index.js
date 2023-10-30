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


const inputErrs = {
    name: {empty: "Укажите имя"},
    surname: {empty: "Укажите фамилию"},
    email: {
        empty: "Укажите электронную почту",
        content: "Проверьте адрес электронной почты"
    },
    phone: {
        empty: "Укажите номер телефона",
        content: "Формат: +9 999 999 99 99"
    },
    inn: {
        empty: "Укажите ИНН",
        content: "Проверьте ИНН"
    }
}
let isProcessed = false
const fields = ["name", "surname", "email", "phone", "inn"]
const inputs = {
    name: '',
    surname: '',
    email: '',
    phone: '',
    inn: ''
}
let isFieldsValid = [false, false, false, false, false]    // Все ли поля заполнены валидными значениями?

document.getElementById("total__order").addEventListener("click", orderBtn => {
    fields.forEach(field => {
        if(!isProcessed) {
            fields.forEach(field => {
                const input = document.querySelector(`#${field} input`)
                checkEmpty(input, field)

                if(field=="phone") 
                    checkPhone(input)
                else if(field=="inn") 
                    checkInn(input)
                else if(field=="email") 
                    checkEmail(input)
                else if(field=="surname" || field=="name")
                    checkName(input, field)


                document.querySelector(`#${field} input`).addEventListener("input", input => {
                    checkEmpty(input.target, field)
                    
                    if(field=="phone") 
                        checkPhone(input.target)
                    else if(field=="inn") 
                        checkInn(input.target)
                    else if(field=="email") 
                        checkEmail(input.target)
                    else if(field=="surname" || field=="name")
                        checkName(input.target, field)
                })
            })
        }
    })
    
    console.log(isFieldsValid.filter(value => value==true).length == isFieldsValid.length)
})

fields.forEach(field => {
    document.querySelector(`#${field} input`).addEventListener("input", input => {
        if(field=="inn")
            validInn(input)
        else if(field=="email")
            validEmail(input)
        else if(field=="phone")
            validPhone(input)
        else if(field=="name" || field=="surname")
            validName(input, field)
    })
})


function checkEmpty(input, field) {
    if(input.value.length > 0) document.querySelector(`#${field} .explain`).style.visibility = 'hidden'
    else {
        document.querySelector(`#${field} .explain`).innerText = inputErrs[field].empty
        document.querySelector(`#${field} .explain`).style.display = 'inline'
        document.querySelector(`#${field} .explain`).style.visibility = 'visible'
        document.querySelector(`#${field} .explain`).classList.add("color_red")
        
        if(field=="inn") {
            document.querySelector(`#inn .recipient__label-prompt`).innerText = 'ИНН для таможни'
            document.querySelector(`#inn .recipient__label-prompt`).style.opacity = 1
        }
    }
}
function checkName(input, field) {
    let isMatch = input.value.match(/^[A-Zа-я]+$/i)
    if(isMatch) {
        if(field=="name") 
            isFieldsValid[0] = true
        if(field=="surname") 
            isFieldsValid[1] = true
    } else {
        if(field=="name") 
            isFieldsValid[0] = false
        if(field=="surname") 
            isFieldsValid[1] = false
    }
}
function checkEmail(input) {
    if(input.value.length > 0) {
        let isMatch = input.value.match(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i)
        if(!isMatch) {
            document.querySelector(`#email .explain`).innerText = inputErrs.email.content
            document.querySelector(`#email .explain`).style.visibility = 'visible'
            document.querySelector(`#email .explain`).classList.add("color_red")
            isFieldsValid[2] = false
        } else {
            inputs.email = isMatch.input
            isFieldsValid[2] = true
        }
    }
}
function checkPhone(input) {
    if(input.value.length > 0) {
        let isMatch = input.value.match(/^[\+]?\d\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/)
        if(isMatch) {
            document.querySelector(`#phone .explain`).style.visibility = 'hidden'
            isFieldsValid[3] = true
        }
        else {
            document.querySelector(`#phone .explain`).innerText = inputErrs.phone.content
            document.querySelector(`#phone .explain`).style.visibility = 'visible'
            isFieldsValid[3] = false
        }
    }
}
function checkInn(input) {
    if(input.value.length > 0) {
        if(input.value.length < 14) {
            document.querySelector(`#inn .explain`).classList.add("color_red")
            document.querySelector(`#inn .explain`).innerText = inputErrs.inn.content
            document.querySelector(`#inn .recipient__label-prompt`).innerText = 'ИНН для таможни'
            isFieldsValid[4] = false
        } else {
            document.querySelector(`#inn .explain`).classList.remove("color_red")
            document.querySelector(`#inn .explain`).innerText = 'Для таможенного оформления'
            document.querySelector(`#inn .recipient__label-prompt`).innerText = 'ИНН'
            isFieldsValid[4] = true
        }
        document.querySelector(`#inn .explain`).style.visibility = 'visible'
    }
}


function validName(input, field) {
    let isMatch = input.target.value.match(/^[A-Zа-я]+$/i)
    if(isMatch) {
        inputs[field] = isMatch.input
    } else if((input.target.value < inputs[field]) && (inputs[field].length)) {
        inputs[field] = input.target.value
    } else {
        input.target.value = inputs[field]
    }
}
function validEmail(input) {
    let isMatch = input.target.value.match(/^[\w-\.@]+$/i)
    if(inputs.email.length == 1) {
        inputs.email = input.target.value
    } else if(!isMatch) {
        input.target.value = inputs.email
    } else {
        inputs.email = isMatch.input
    }
}
function validPhone(input) {
    // Только цифры
    let isMatch = input.target.value.match(/^[\d\+\s]+$/)
    if((!isMatch && inputs.phone.length == 1) || !isMatch) {
        input.target.value = inputs.phone
        return;
    }

    // Del 
    if(isMatch.input.length < inputs.phone.length) {
        inputs.phone = isMatch.input
    }   // maxLength
    else if(inputs.phone.length == 16) {
        input.target.value = inputs.phone
    }   // копипаст - больше 1 символа 
    else if(Math.abs(inputs.phone.length - isMatch.input.length) > 1) {
        let value = input.target.value
        if(input.target.value[0] != '+') {
            value = '+'+input.target.value
        } 
        [2, 6, 10, 13].forEach(index => {
            if(value.length > index) {
                if(value[index] != ' ') {
                    value = value.slice(0, index) + ' ' + value.slice(index)
                }
            }
        })
        inputs.phone = value
        input.target.value = inputs.phone
    }
    else if(input.target.value[0] != '+') {
        input.target.value = '+'+input.target.value
    }     //Запись в середину 
    else if(isMatch.input.indexOf(inputs.phone) == -1) {
        inputs.phone = input.target.value
    }   // посимвольная запись в конец 
    else {
        // 1st symb
        if(inputs.phone.length == 0) {
            inputs.phone = '+'+isMatch.input
            input.target.value = inputs.phone
        } 
        else if(inputs.phone.length == 2 || inputs.phone.length == 6 ||
                inputs.phone.length == 10|| inputs.phone.length == 13) {
            inputs.phone = inputs.phone+' '+isMatch.input.slice(inputs.phone.length)
            input.target.value = inputs.phone
        } 
        else {
            inputs.phone = isMatch.input
            input.target.value = inputs.phone
        }
    }
}
function validInn(input) {
    // Только цифры
    let isMatch = input.target.value.match(/^\d+$/)
    if(isMatch && isMatch.input.length < 14) {
        inputs.inn = isMatch.input
    } else if (isMatch && isMatch.input.length == 14) {
        inputs.inn = isMatch.input
    } else if(inputs.inn.length == 1) {
        inputs.inn = input.target.value
    } else {
        input.target.value = inputs.inn
    }
}