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
});
openDeliveryPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBgDelivery.classList.add('active'); // Добавляем класс 'active' для фона
        popupDelivery.classList.add('active'); // И для самого окна
    })
});
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