/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function (promise1, promise2) {

    // promise all takes two number values and returns them at the same time.
    let [value1, value2] = await Promise.all([promise1, promise2]);

    return(value1+value2)
    // return (await promise1) +(await promise2) ;
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */