// ------------------- CLOSURE ------------------- 

function example() {
    let blog = "learnersbucket";
    function displayBlog() {
        console.log(blog);
    }
    displayBlog();
}

example();

function sum() {
    let a = 10;
    function add(b) {
        return a+b;
    }
    return add;
}

let fn = sum();
console.log(fn(20));

module.exports = { example, sum }

// ------------------- CLOSURE ------------------- 
