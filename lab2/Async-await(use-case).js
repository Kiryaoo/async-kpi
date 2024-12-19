// Async/await solution for map
const asyncBasedMap = async (array, transformFunc) => {
    const mappedArray = [];

    for (let i = 0; i < array.length; i++) {
        const transformedValue = await transformFunc(array[i], i, array);
        mappedArray.push(transformedValue);
    }

    return mappedArray;
};


const numbers = [1, 2, 3, 4];

const doubleAsync = async (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 1000);
    });
};

(async () => {
    try {

        const result = await asyncBasedMap(numbers, doubleAsync);
        console.log("Mapped result:", result); // [2, 4, 6, 8]
    } catch (error) {
        console.error("Error:", error);
    }
})();
