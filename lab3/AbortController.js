async function promiseMap(arr, callback) {
    const promises = arr.map(async (element, index) => {
        return callback(element, index);
    });

    return Promise.all(promises);
}


const numbers = [1, 2, 3, 4];

async function doublePromise(num, index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
}

(async () => {
    try {
        const result = await promiseMap(numbers, doublePromise);
        console.log(result); // Виведе [2, 4, 6, 8]
    } catch (error) {
        console.error(error);
    }
})();
