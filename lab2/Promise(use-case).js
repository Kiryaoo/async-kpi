const numbers = [1, 2, 3, 4];

function asyncMap(arr, asyncCallback) {
    return Promise.all(arr.map((item, index) => asyncCallback(item, index)));
}
// Async function with promise
function doubleAsync(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
}


asyncMap(numbers, doubleAsync)
    .then((result) => {
        console.log("Promise-based result:", result); // [2, 4, 6, 8]
    })
    .catch((err) => {
        console.error("Error:", err);
    });
