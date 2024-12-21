const CallbackBasedMap = (userArray, transformFunction, finalCallback) => {
    const mappedArray = [];
    let hasErrorOccurred = false;
    let elementsLeft = userArray.length;

    for (let i = 0; i < userArray.length; i++) {
        transformFunction(userArray[i], (error, transformedValue) => {
            if (hasErrorOccurred) {
                return;
            }

            if (error) {
                finalCallback(error, null);
                hasErrorOccurred = true;
                return;
            }

            mappedArray[i] = transformedValue;

            elementsLeft--;
            if (elementsLeft === 0) {
                finalCallback(null, mappedArray);
            }
        });
    }
};

// Приклади використання
const numbers = [1, 2, 3, 4];


CallbackBasedMap(
    numbers,
    (num, cb) => {
        setTimeout(() => {
            cb(null, num * 2);
        }, 1000);
    },
    (error, mapped) => {
        if (error) {
            console.log("Error occurred:", error);
        } else {
            console.log("Mapped Array:", mapped);
        }
    }
);