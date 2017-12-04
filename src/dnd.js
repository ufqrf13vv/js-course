/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let newElement = document.createElement('div');
    let width = getRandom(500, 1);
    let height = getRandom(500, 1);

    newElement.setAttribute('class', 'draggable-div');
    newElement.style.width = width + 'px';
    newElement.style.height = height + 'px';
    newElement.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    newElement.style.position = 'absolute';
    newElement.style.top = getRandom(window.innerHeight - height) + 'px';
    newElement.style.left = getRandom(window.innerWidth - width) + 'px';

    return newElement;
}

function getRandom(max, min = 1) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.onmousedown = function (e) {
        let coordinates = getDivCoordinates(target);
        let shiftX = e.pageX - coordinates.left; // координаты курсора относительно левого верхнего угла элемента
        let shiftY = e.pageY - coordinates.top;

        // Функция перемещения
        function moveAt(e) {
            target.style.left = e.pageX - shiftX + 'px';
            target.style.top = e.pageY - shiftY + 'px';
        }

        // Перемещаем по экрану
        document.onmousemove = function(e) {
            moveAt(e);
        };

        //  Окончание переноса, когда отжали клавишу мыши
        target.onmouseup = function() {
            document.onmousemove = null;
            target.onmouseup = null;
        };

        // Отключение Drag’n’Drop браузера
        target.ondragstart = function() {
            return false;
        };
    };

    //  Координаты левой верхней точки блока
    function getDivCoordinates(elem) {
        let box = elem.getBoundingClientRect(); // возвращает размер элемента и его позицию относительно окна

        return {
            top: box.top + pageYOffset, //  координаты относительно документа с прокруткой
            left: box.left + pageXOffset
        };
    }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
