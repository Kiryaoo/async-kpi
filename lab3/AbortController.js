const promiseBasedMap = (array, userSignal, transformFunc) => {
    const resultArray = new Array(array.length); // Зберігаємо результати у масив

    const promises = array.map((item, index) => {
        return Promise.resolve(transformFunc(item, userSignal))
            .then((result) => {
                resultArray[index] = result; // Зберігаємо результат у відповідному індексі
            });
    });

    return Promise.all(promises)
        .then(() => resultArray); // Повертаємо заповнений масив результатів
};

// Test cases
const controller = new AbortController();
const mySignal = controller.signal;

const numbers = [1, 2, 3, 4];

// Завершуємо операцію через 1500 мс
setTimeout(() => controller.abort(), 1500);

promiseBasedMap(
    numbers,
    mySignal,
    (num, signal) => {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error("Aborted"));
            }

            const onAbort = () => {
                clearTimeout(timeout);
                reject(new Error(`Operation aborted for number ${num}`));
            };

            signal.addEventListener("abort", onAbort);

            const timeout = setTimeout(() => {
                signal.removeEventListener("abort", onAbort);
                resolve(num * 2); // Подвоюємо значення
            }, 1000);
        });
    }
)
    .then((result) => {
        console.log("Mapped result:", result); // Наприклад, [2, 4] якщо операція була скасована
    })
    .catch((error) => {
        console.error("Error:", error.message); // Виводить помилку у разі аборту або іншої проблеми
    });
