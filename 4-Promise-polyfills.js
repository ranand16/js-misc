const asyncTask = function(to) {
    return new Promise((resolve, reject)=>{
        setTimeout(() => resolve(`Completed ${to} now.`), 100 * to);
    })
}

// 1. Promise.all polyfill
function promiseAll(promises){
    const results = [];
    let promisesCompleted = 0;
    return new Promise((resolve, reject)=> {
        promises.forEach((promise, index)=>{
            promise.then((val)=>{
                results[index] = val;
                promisesCompleted += 1;
                if(promisesCompleted === promises.length) {
                    resolve(results)
                }

            }, (error)=>{
                reject(error)
            })
        })
    })
}

// 2. Promise.any 
function promiseAny(promises) {
    const results = [];
    const promisesCompleted = 0;
    return new Promise((resolve, reject)=>{
        promises.forEach((task)=>{
            Promise.resolve(task).then(resolve).catch((error)=>{
                results.push(error);
                promisesCompleted += 1;
                if(promisesCompleted === promises.length) reject(results);
            });
        });
    });
}

// 3. Promise.race 
const race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach((p)=>{
            Promise.resolve(p).then(resolve, reject).catch(reject);
        })
    })
}

// 4. Promise.finally 
Promise.prototype.finally = function(callback) {
    if(typeof callback !== 'function') return this.then(callback, callback)
    const p = this.constructor || Promise;

    return this.then(
        value => p.resolve(callback()).then(() => value),
        error => p.resolve(callback()).then(()=>{throw error;})
    )
}

// 5. Promise.allSettled
const allSettled = (promises) => {
    const mappedPromises = promises.map((p)=>p.resolve(p)
        .then(
            res => ({status: 'fulfilled', value: res}), 
            rej => ({status: 'rejected', value: err}),
        )
    )
    return Promise.all(mappedPromises);
}

// 6. Execute Promises in series - 3 ways 
// 6.1 using async await
const asyncSeries = async function(promises) {
    for (const promise in promises) {
        try {
            const result = await promise;
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
}

const seriestask = [asyncTask(4), asyncTask(2), asyncTask(6), asyncTask(3)]
// asyncSeries(seriestask);
// 6.2 using recursion
const asyncSeriesRecursion = (promises) => {
    let promise = promises.shift();
    promise.then((data) => {
        console.log(data);
        if(promises.length > 0){
            asyncSeriesRecursion(promises)
        }
    })
}

// 6.3 asyncSeriesRecursion(seriestask);

const asyncSeriesReduce = (promises) => {
    promises.reduce((acc, cur, index, array) => {
        return acc.then(()=>{
            return cur.then((value)=>{
                console.log("Reduce: ", value);
            })
        })
    }, Promise.resolve());
}

// asyncSeriesReduce(seriestask)

// 7. Execute Promises in parallel
const executeInPrallel = (promises, callback) => {
    const results = [];
    let tasksCompleted = 0;
    promises.forEach(promise => {
        promise(value=> {
            results.push(value);
            tasksCompleted += 1;
            if(tasksCompleted >= promises.length) {
                callback(results);
            }
        })
    });
}

const asynchroTask = () => {
    const v = Math.floor(Math.random()*10);
    return function(callback) {
        setTimeout(() => {
            callback(v+" pra")
        }, v * 1000);
    }
}

const parAsyncTasks = [
    asynchroTask(),
    asynchroTask(),
    asynchroTask(),
    asynchroTask(),
    asynchroTask(),
    asynchroTask(),
    asynchroTask()
]

executeInPrallel(parAsyncTasks, (value) => {
    console.log(value);
});