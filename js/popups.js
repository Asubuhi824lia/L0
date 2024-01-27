let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
let popup   = document.querySelector('.popup');     // Само окно
let openPopupButtons = document.querySelectorAll('.open-popup');// Кнопки для показа окна
let closePopupButton = document.querySelector('.close-popup');  // Кнопка для скрытия окна


openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBg.classList.add('active'); // Добавляем класс 'active' для фона
        popup.classList.add('active'); // И для самого окна
    })
});

closePopupButton.addEventListener('click',() => {
    popupBg.classList.remove('active'); // Убираем активный класс с фона
    popup.classList.remove('active'); // И с окна
});
// Прячем попап окно при клике на фон
document.addEventListener('click', (e) => {
    if(e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});