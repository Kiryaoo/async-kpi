const data = [1, 2, 3, 4, 5];//Example

async function* asyncIterator(data) {//Async generator
    for (let i = 0; i < data.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield data[i];//Return current element of array data[i]
    }
}



async function processData() {
    for await (const item of asyncIterator(data)) {
        console.log('Processed item:', item);
    }
}

// Start processing the data
processData();
