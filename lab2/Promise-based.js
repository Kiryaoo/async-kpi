function asyncMap(arr, asyncCallback) {
    return new Promise((resolve, reject) => {
        const result = [];
        let completed = 0;

        arr.forEach((item, index) => {
            asyncCallback(item, index, arr)
                .then((value) => {
                    result[index] = value;
                    completed++;


                    if (completed === arr.length) {
                        resolve(result);
                    }
                })
                .catch(reject);
        });


        if (arr.length === 0) {
            resolve([]);
        }
    });
}


const numbers = [1, 2, 3, 4];

function doubleAsync(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
}


asyncMap(numbers, doubleAsync)
    .then((result) => {
        console.log("Result:", result); // [2, 4, 6, 8]
    })
    .catch((err) => {
        console.error("Error:", err);
    });
