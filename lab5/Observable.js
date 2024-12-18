const { Observable } = require('rxjs');//Import from RxJS

// Create Observable
const messageObservable = new Observable((subscriber) => {
    setTimeout(() => {
        subscriber.next('Hello, World!');//Output value to the stream
        subscriber.complete();//Ending stream
    }, 1000);
});

//Subscribe to Observable stream
messageObservable.subscribe({
    next: (message) => console.log('Received message:', message),//Calling values that emission Observable
    complete: () => console.log('Message processing complete.')//Calling when Observable ends emission of values
});