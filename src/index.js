/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {

    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray[i] = fn(array[i], i, array);
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    let value = initial || array[0];
    let i = initial ? 0 : 1;

    for (; i < array.length; i++) {
        value = fn(value, array[i], i, array);
    }

    return value;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {

    if (prop in obj) {
        return true;
    }

    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let properties = [];

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            key = key.toUpperCase();
            properties.push(key);
        }
    }

    return properties;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    let result = [];
    let i = 0;

    if (from == 0 && to == 0) {
        return result;
    } else if (from >= 0) {
        if (to > 0) {
            to = (to > array.length) ? array.length : to;
            for (i = from; i < to; i++) {
                result.push(array[i]);
            }
        } else if (to < 0) {
            for (i = from; i < (array.length + to); i++) {
                result.push(array[i]);
            }
        } else if (!to) {
            for (i = from; i < array.length; i++) {
                result.push(array[i]);
            }
        }

        return result;
    } else if (from < 0 && typeof to != 'undefined') {
        if (to > 0) {
            for (i = 0; i < to; i++) {
                result.push(array[i]);
            }
        } else if (to <= 0) {
            for (i = 0; i < (array.length + to); i++) {
                result.push(array[i]);
            }
        }

        return result;
    }

    return array;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = Math.pow(value, 2);

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
