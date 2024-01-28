let openPayPopupButtons = document.querySelectorAll('.open-popup-pay');   // Кнопки для показа окна
let popupBgPay = document.querySelector('.popup-pay__bg'); // Фон попап окна
let popupPay   = document.querySelector('.popup-pay');     // Само окно

let openDeliveryPopupButtons = document.querySelectorAll('.open-popup-delivery');   // Кнопки для показа окна
let popupBgDelivery = document.querySelector('.popup-delivery__bg'); // Фон попап окна
let popupDelivery   = document.querySelector('.popup-delivery');     // Само окно        

let closeDeliveryPopupButton = document.querySelector('.close-popup-delivery'); // Кнопка для скрытия окна
let closePayPopupButton = document.querySelector('.close-popup-pay'); // Кнопка для скрытия окна


openPayPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBgPay.classList.add('active'); // Добавляем класс 'active' для фона
        popupPay.classList.add('active'); // И для самого окна
    })

    popupPay.querySelectorAll(".pay-ways__option").forEach((label,id,labelBox) => {
        label.addEventListener('mousedown', () => delPrevCheck(labelBox))
    })

    popupPay.querySelector(".button").addEventListener("click", () => {
        // Установить способ оплаты
        document.querySelectorAll(".card-info img").forEach(img => img)
    })
});
openDeliveryPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBgDelivery.classList.add('active'); // Добавляем класс 'active' для фона
        popupDelivery.classList.add('active'); // И для самого окна

        popupDelivery.querySelectorAll(".actions__to-basket").forEach(delBtn => {
            delBtn.addEventListener("mouseover", () => {
                delBtn.querySelector("img").attributes.src.value = "./icons/basket/to_basket_hover.svg"
            })
            delBtn.addEventListener("mouseout", () => {
                delBtn.querySelector("img").attributes.src.value = "./icons/basket/to_basket.svg"
            })

            delBtn.addEventListener("click", (el) => {el.target.parentNode.remove()})
        })
    })

    popupDelivery.querySelectorAll(".delivery-addresses__option").forEach((label,id,labelBox) => {
        label.addEventListener('mousedown', () => delPrevCheck(labelBox))
    })

    popupDelivery.querySelectorAll(".delivery-ways button").forEach((button,id,btns) => {
        button.addEventListener("click", () => {
            btns.forEach(btn => {
                if(btn == button) {
                    btn.classList.add("button_border-color_chosen")
                    btn.classList.remove("button_border-color_disabled")
                } else {
                    btn.classList.add("button_border-color_disabled")
                    btn.classList.remove("button_border-color_chosen")
                }
            })
        })
    })

    popupDelivery.querySelector(".button").addEventListener("click", () => {
        // Установить адрес

        // Установить способ доставки
    })
});
function delPrevCheck(labelBox) {
    labelBox.forEach(label => {
        const isChecked = label.querySelector("[type='radio']")
        if(isChecked.checked) isChecked.checked=false
    })
}
// Убираем активные классы с фона
closeDeliveryPopupButton.addEventListener('click',() => {
    popupBgDelivery.classList.remove('active'); 
    popupDelivery.classList.remove('active');
});
closePayPopupButton.addEventListener('click',() => {
    popupBgPay.classList.remove('active');
    popupPay.classList.remove('active');
});
// Прячем попап окно при клике на фон
document.addEventListener('click', (e) => {
    if(e.target === popupBgDelivery) {
        popupBgDelivery.classList.remove('active'); 
        popupDelivery.classList.remove('active');
    } else if(e.target === popupBgPay) {
        popupBgPay.classList.remove('active');
        popupPay.classList.remove('active');
    }
});


function toggleRadioBox(radioElem) {

}