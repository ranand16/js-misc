const wait = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, delay);
    })
}
// 1. Retry with a delay
const retryWithDelay = (operation, retries=3, delay=1000, finalErr = "Retry failed") => {
    return new Promise((resolve, reject)=> {
        return operation().then(resolve).catch((reason)=>{
            if(retries > 0) {
                return wait(delay)
                .then(retryWithDelay.bind(null, operation, retries - 1, delay, finalErr))
                .then(resolve)
                .catch(reject)
            }
            return reject(finalErr)
        })
    })
}

const retryExamplePromise = () => {
    let r = 0;
    return async() => {
        r+=1;
        if(r < 5) {
            throw new Error(`This is error at ${r}`)
        }
    }
}

const test = async () => {
    await retryWithDelay(retryExamplePromise(), 8)
    console.log("Success!");
    await retryWithDelay(retryExamplePromise(), 2) // should fail
    await retryWithDelay(retryExamplePromise(), 4)
}

test().catch((err)=>{
    console.error(err);
})