const promiseBasedMap = (array, asyncCallback) => {
    const mappedArray = [];

    let promises = array.map((item, index) => {
        return Promise.resolve(asyncCallback(item, index, array))
            .then((result) => {
                mappedArray[index] = result;
            });
    });

    return Promise.all(promises).then(() => mappedArray);
};


promiseBasedMap([1, 2, 3, 4], (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
}).then((result) => {
    console.log("Mapped result (simple doubling):", result);
});


promiseBasedMap(["a", "b", "c"], (char) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(char.toUpperCase());
        }, 500);
    });
}).then((result) => {
    console.log("Mapped result (strings to uppercase):", result);
});

// 3. Симуляція помилки
promiseBasedMap([1, 2, 3], (num) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num === 2) {
                reject(new Error("Test error"));
            } else {
                resolve(num * 3);
            }
        }, 700);
    });
})
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.error("Error:", error.message);
    });

// 4. Умовне перетворення
promiseBasedMap([10, 15, 20], (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num % 2 === 0 ? num / 2 : num * 3);
        }, 300);
    });
}).then((result) => {
    console.log("Mapped result (conditional transformation):", result);
});
