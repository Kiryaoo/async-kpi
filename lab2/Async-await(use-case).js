async function processNumbers() {
    const numbers = [1, 2, 3, 4];

    // Асинхронна функція, яка подвоює значення
    async function doubleAsync(num) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num * 2);
            }, 1000);
        });
    }

    // Використання async/await
    try {
        const result = await asyncMap(numbers, doubleAsync);
        console.log("Async/Await result:", result); // [2, 4, 6, 8]
    } catch (err) {
        console.error("Error:", err);
    }
}

processNumbers();

