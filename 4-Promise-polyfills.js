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


// 5. Execute Promises in series - 3 ways 

// 6. Execute Promises in parallel