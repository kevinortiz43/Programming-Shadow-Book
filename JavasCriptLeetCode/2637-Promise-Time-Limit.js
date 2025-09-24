/**
 * @param {Function} fn
 * @param {number} t
 * @return {Function}
 */

// function timelimit with parameter of fn (more functions) and t of time
var timeLimit = function (fn, t) {

    //creating an asynchronous function
    // async functions in js allow functions to run without 
    // blocking the thread of execution
    return async function (...args) {

        // We create a promise that says that we will
        // expect an answer (resolve or rejection
        return new Promise((resolve, reject) => {

            // creating an empty variable 
            let timerId;

            // activate our function with arguments
            fn(...args).then(result => {
                    resolve(result);
                }).catch(error => {
                    reject(error);
                }).finally(() => {
                    clearTimeout(timerId);
                });

            timerId = setTimeout(()=>{
                reject('Time Limit Exceeded');
            },t)


        });

        // if this fails then return  "Time Limit Exceeded".
        //else nothing?
    }
};

/**
 * const limited = timeLimit((t) => new Promise(res => setTimeout(res, t)), 100);
 * limited(150).catch(console.log) // "Time Limit Exceeded" at t=100ms
 */