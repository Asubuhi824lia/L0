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
let card_names = [];

function onResize() 
{
    if(window.innerWidth >= 1024) {
        document.querySelectorAll(".unavailable__card-name").forEach(element => {
            element.classList.remove("card-description_font")
            element.classList.add("text_font")
        });
    
        document.querySelectorAll(".size").forEach(el => {el.classList.add("visibility_h");el.classList.remove("visibility_v")})

        document.querySelectorAll(".total__bonus, .write-off-way").forEach(element => {
            element.classList.remove("bg-color_smoky-dark")
            element.classList.add("main_bg-color-primary")
        })

        let available__card   = document.querySelectorAll(".available__card-name")
        let unavailable__card = document.querySelectorAll(".unavailable__card-name")
        card_names.forEach((card, index) => {
            if(available__card[index].innerText == card.full) return;
            else {
                available__card[index].innerText = card.full;
                unavailable__card[index].innerText = card.full;
            }
        })
    } else {
        document.querySelectorAll(".unavailable__card-name").forEach(element => {
            element.classList.remove("text_font")
            element.classList.add("card-description_font")
        });
    
        document.querySelectorAll(".size").forEach(el => {el.classList.remove("visibility_h");el.classList.add("visibility_v")})

        document.querySelectorAll(".total__bonus, .write-off-way").forEach(element => {
            element.classList.add("bg-color_smoky-dark")
            element.classList.remove("main_bg-color-primary")
        })

        let available__card = document.querySelectorAll(".available__card-name")
        let unavailable__card = document.querySelectorAll(".unavailable__card-name")
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
    cards.forEach((item,ind) => {
        let cardElem = document.querySelectorAll(`.available__card.card`)[ind]
        let incBtn = cardElem.getElementsByClassName("counter__inc")[0]
        incBtn.addEventListener("click", () => incItem(cardElem, item.left))
    })
}
function incItem(elem, left) {
    let num = elem.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    if(curNum == left) return
    if(curNum+1 == left) elem.querySelector(".counter__inc").classList.add("color_gray")
    if(curNum+1 == 2)    elem.querySelector(".counter__dec").classList.add("color_black")
    num.innerText = curNum+1
}

function addDecItemListener() 
{
    cards.forEach((item,ind) => {
        let cardElem = document.querySelectorAll(`.available__card.card`)[ind]
        let decBtn = cardElem.querySelector(".counter__dec")
        decBtn.addEventListener("click", () => decItem(cardElem, item.left))
    })
}
function decItem(elem, left) {
    let num = elem.querySelector(".counter__num")
    const curNum = Number(num.innerText)

    if(curNum > 1) num.innerText = curNum-1
    if(curNum == left) elem.querySelector(".counter__inc").classList.add("color_black")
    if(curNum == 1)    elem.querySelector(".counter__dec").classList.add("color_gray")
}

function addToggleFavoriteCardListener() 
{
    const cardElems = document.querySelectorAll(`.card`)
    cardElems.forEach(elem => {
        const likeBtn = elem.querySelector(".actions__to-like")
        likeBtn.addEventListener("click", () => likeCard(elem))
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

function addDelCardListener() 
{
    cards.forEach(item => {
        const cards = document.querySelectorAll(`.card`)
        cards.forEach(card => {
            const delBtn = card.querySelector(".actions__to-basket")
            delBtn.addEventListener("click", () => delCard(card, item.id))
        })
    })
}
function delCard(card, index) {
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

addDelCardListener()
addToggleFavoriteCardListener()

addIncItemListener()
addDecItemListener()

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

document.getElementById("total__order").addEventListener("click", () => {
    if(!isProcessed) {
        fields.forEach(field => {
            const input = document.querySelector(`#${field} input`)
            checkFields(input, field)

            document.querySelector(`#${field} input`)
                .addEventListener("input", input=>checkFields(input.target, field))
        })
    }
    
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


function checkFields(input, field) {
    checkEmpty(input, field)
    if     (field=="phone") checkPhone(input)
    else if(field=="inn")   checkInn(input)
    else if(field=="email") checkEmail(input)
    else if(field=="surname" || field=="name") checkName(input, field)
}
function checkEmpty(input, field) {
    if(input.value.length > 0) document.querySelector(`#${field} .explain`).classList.add("visibility_h")
    else {
        document.querySelector(`#${field} .explain`).innerText = inputErrs[field].empty
        document.querySelector(`#${field} .explain`).classList.add("color_red visibility_v display_i")
        if(field=="inn") {
            document.querySelector(`#inn .recipient__label-prompt`).innerText = 'ИНН для таможни'
            document.querySelector(`#inn .recipient__label-prompt`).classList.add("visibility_v")
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
            document.querySelector(`#email .explain`).classList.add("color_red visibility_v")
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
            document.querySelector(`#phone .explain`).classList.add("visibility_h")
            isFieldsValid[3] = true
        }
        else {
            document.querySelector(`#phone .explain`).innerText = inputErrs.phone.content
            document.querySelector(`#phone .explain`).classList.add("visibility_v")
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
        document.querySelector(`#inn .explain`).classList.add("visibility_v")
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