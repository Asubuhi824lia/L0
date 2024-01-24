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