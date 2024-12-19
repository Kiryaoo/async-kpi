const promiseBasedMap = (array, mapFunc) => {
    return new Promise((resolve, reject) => {
        const mappedArray = [];
        let completed = 0;

        if (array.length === 0) {
            resolve([]);
            return;
        }

        for (let i = 0; i < array.length; i++) {
            const item = array[i];

            Promise.resolve(mapFunc(item))
                .then((result) => {
                    mappedArray[i] = result;
                })
                .catch((error) => {
                    reject(error);
                })
                .finally(() => {
                    completed++;
                    if (completed === array.length) {
                        resolve(mappedArray);
                    }
                });
        }
    });
};


const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];


promiseBasedMap(
    firstArray,
    (elem) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(elem * 2);
            }, 1000);
        });
    }
)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

promiseBasedMap(
    secondArray,
    (elem) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(elem.toUpperCase()); // Перетворюємо кожен елемент на верхній регістр
            }, 1000);
        });
    }
)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error);
    });

promiseBasedMap(
    firstArray,
    (elem) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (elem % 2 === 0) {
                    resolve(elem * 3);
                } else {
                    reject(new Error("Odd numbers are not allowed"));
                }
            }, 1000);
        });
    }
)
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error(error.message);
    });
