function asyncMap(arr, asyncCallback, signal) {
    return new Promise((resolve, reject) => {
        const result = [];
        let completed = 0;

        if (signal && signal.aborted) {
            return reject(new Error("Operation aborted"));
        }

        const onAbort = () => reject(new Error("Operation aborted"));

        // Встановлюємо обробник скасування, якщо переданий сигнал
        signal?.addEventListener("abort", onAbort);

        arr.forEach((item, index) => {
            asyncCallback(item, index, arr)
                .then((value) => {
                    if (signal?.aborted) return;
                    result[index] = value;
                    completed++;

                    if (completed === arr.length) {
                        signal?.removeEventListener("abort", onAbort);
                        resolve(result);
                    }
                })
                .catch((err) => {
                    signal?.removeEventListener("abort", onAbort);
                    reject(err);
                });
        });

        // Якщо масив порожній, одразу завершуємо
        if (arr.length === 0) {
            signal?.removeEventListener("abort", onAbort);
            resolve([]);
        }
    });
}

const numbers = [1, 2, 3, 4];

function doubleAsync(num, signal) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            resolve(num * 2);
        }, 1000);

        signal?.addEventListener("abort", () => {
            clearTimeout(timeout);
            reject(new Error(`Operation aborted for number ${num}`));
        });
    });
}

const controller = new AbortController();

asyncMap(numbers, (num) => doubleAsync(num, controller.signal), controller.signal)
    .then((result) => {
        console.log("Result:", result);
    })
    .catch((err) => {
        console.error("Error:", err.message);
    });


setTimeout(() => {
    controller.abort();
}, 1500);
