const promiseBasedMap = async (array, mapFunc) => {
    const mappedArray = [];
    for (let i = 0; i < array.length; i++) {
        try {
            mappedArray[i] = await mapFunc(array[i]);
        } catch (error) {
            throw error;
        }
    }
    return mappedArray;
};

const firstArray = [1, 2, 3, 4, 5, 6];
const secondArray = ['a', 'o', 'b', 'w', 'h', 'z'];

(async () => {
    try {
        const result1 = await promiseBasedMap(firstArray, async (elem) => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return elem * 2;
        });
        console.log(result1);

        const result2 = await promiseBasedMap(secondArray, async (elem) => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            return elem.toUpperCase();
        });
        console.log(result2);

        const result3 = await promiseBasedMap(firstArray, async (elem) => {
            await new Promise((resolve) => setTimeout(resolve, 100));
            if (elem % 2 === 0) {
                return elem * 3;
            } else {
                throw new Error("Odd numbers are not allowed");
            }
        });
        console.log(result3);
    } catch (error) {
        console.error(error.message);
    }
})();
