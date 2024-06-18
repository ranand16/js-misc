// AGGREGATION

const arr1 = [1,2,3,4];
const sum = arr1.reduce((accVal, currVal)=> {
    return accVal + currVal
}, 0)

console.log(sum);

// Segregation
const arr2 = [1.1, 1.2,1.3,1.4,2.3,2.4,2.5];
const seggregate = arr2.reduce((prevVal, currVal)=>{
    const key = Math.floor(currVal);
    if(prevVal[key]) prevVal[key].push(currVal);
    else prevVal[key] = [currVal]
    return prevVal;
}, {});

console.log(seggregate)


// Run in Sequence 
const uppercase = str => str.toUpperCase();
const reverse = str => str.split('').reverse().join('');
const append = str => "Hello " + str;

const intialText = "Rishabh Anand"
const seqArr = [uppercase, reverse, append];
const runSeqArr = seqArr.reduce((prevVal, currFunc)=>{
    return currFunc(prevVal);
}, intialText);
console.log("🚀 runSeqArr:", runSeqArr)

// Run promises in a sequence 

const asyncTask = (time) => {
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(`Resolved in time ${time}`);
        }, time*100);
    });
}

const p = [
    asyncTask(6),
    asyncTask(2),
    asyncTask(1),
    asyncTask(4),
    asyncTask(0),
]

const asyncSeriesExecuter = (promises) => {
    promises.reduce((acc, curr)=> {
        return acc.then(()=>{
            return curr.then(val=> console.log(val))
        })
    }, Promise.resolve())
}
console.log("🚀 ~ asyncSeriesExecuter:", asyncSeriesExecuter(p));
