/**
 * Used to check if two arrays are equal.
 * @param {any[]} array1 is check if it is equal to `array2`
 * @param {any[]} array2 is check if it is equal to `array1`
 * @returns {Boolean} weather `array1` and `array2` are equal
 */
function arraysEqual(array1, array2) {
    if (!Array.isArray(array1)) return false;
    if (!Array.isArray(array2)) return false;
    
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }

    return true;
}

/**
 * Used to check if two json objects are equal.
 * @param {object} json1 is check if it is equal to `json2`
 * @param {object} json2 is check if it is equal to `json1`
 * @returns {Boolean} weather `json1` and `json2` are equal
 */
function jsonsEqual(json1, json2) {
    return JSON.stringify(json1) === JSON.stringify(json2);
}

export {
    arraysEqual,
    jsonsEqual
}