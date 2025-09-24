/**
 * @param {number} millis

 */
async function sleep(millis) {
    
    // set time out will put the function to sleep for the time of (millis)
    await new Promise(resolve => setTimeout(resolve, millis));
}

/** 
 * let t = Date.now()
 * sleep(100).then(() => console.log(Date.now() - t)) // 100
 */