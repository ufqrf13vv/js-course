/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

import sortArray from './index';

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response.sort(sortArray));
            } else {
                reject();
            }
        };
        xhr.send();
    });
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    if (full.toLowerCase().indexOf(chunk.toLowerCase()) != -1) {
        return true;
    }

    return false;
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let repeatButton = document.createElement('button');
let errorBlock = document.createElement('div');
let resolve = (result) => {
    towns = result;
    loadingBlock.style.display = 'none';
    filterBlock.style.display = 'block';
};
let error = () => {
    loadingBlock.style.display = 'none';
    errorBlock.textContent = 'Не удалось загрузить города';
    repeatButton.textContent = 'Повторить';
    homeworkContainer.appendChild(errorBlock);
    homeworkContainer.appendChild(repeatButton);
};
let towns = [];

loadTowns()
    .then(resolve)
    .catch(error);

repeatButton.addEventListener('click', () => {
    loadingBlock.style.display = 'block';
    loadTowns()
        .then(resolve)
        .catch(error);
});

filterInput.addEventListener('keyup', () => {
    filterResult.textContent = '';

    if (!filterInput.value) {
        filterResult.textContent = '';
    } else {
        towns.forEach((item) => {
            if (isMatching(item.name, filterInput.value.trim())) {
                filterResult.innerHTML += item.name + '<br>';
            }
        });
    }
});

export {
    loadTowns,
    isMatching
};
