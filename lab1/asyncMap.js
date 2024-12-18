function asyncMap(arr, callback) {
    let result = []; // Array to store the transformed values.
    let completed = 0;

    // Helper function to handle the transformed value.
    function handleResult(index, transformedValue) {
        result[index] = transformedValue;
        completed++;


        if (completed === arr.length) {
            console.log(result);
        }
    }

    for (let i = 0; i < arr.length; i++) {

        callback(arr[i], i, handleResult.bind(null, i));
    }
}

// Example
const numbers = [1, 2, 3, 4];

function doubleAsync(num, index, callback) {
    // Simulate an asynchronous operation
    setTimeout(() => {
        callback(num * 2);
    }, 1000);
}


asyncMap(numbers, doubleAsync);
