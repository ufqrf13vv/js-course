/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

//import { createCookie, deleteCookie } from './index';
function deleteCookie(name) {
    let cookieDate = new Date();

    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = name + '=; expires=' + cookieDate.toGMTString();
}
/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

getCookies();

filterNameInput.addEventListener('keyup', () => {
    let cookieArray = getCookieArray();

    getCookies(searchArray(cookieArray));
});

addButton.addEventListener('click', () => {
    let cookieName = addNameInput.value;
    let cookieValue = addValueInput.value;
    let cookieArray = [];

    createCookie(cookieName, cookieValue);

    cookieArray = getCookieArray();

    getCookies(searchArray(cookieArray));
});

//  Вывод массива соответствующего поисковому запросу
function searchArray(receivedArray) {
    let result = [];

    receivedArray.forEach((item, i, receivedArray) => {
        if (isMatching(item, filterNameInput.value.trim())) {
            result.push(item);
        }
    });

    return result;
}

//  Массив с куками
function getCookieArray() {
    let cookies = document.cookie;

    return cookies.split('; ');
}

function createCookie(name, value) {
    document.cookie = name + '=' + value;
}

//  Вывод списка кук, соответствующих поисковому запросу
function getCookies(getArray) {
    let cookieArray;
    let key;

    if (getArray) {
        cookieArray = getArray;
    } else {
        cookieArray = getCookieArray();
    }

    listTable.textContent = '';

    let result = cookieArray.reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    for (key in result) {
        listTable.innerHTML += '<tr><td>' + key + '</td><td>' + result[key] + '</td><td><button class="remove" data-name="' + key + '">Удалить</button></td></tr>';
    }
}

function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) {
        return true;
    }

    return false;
}

//  Удаление куки
listTable.onclick = (event) => {
    let cookieName = event.target.getAttribute('data-name');

    deleteCookie(cookieName);
    getCookies();
};