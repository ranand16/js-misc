function Example(blog) {
    if(!(this instanceof Example)) {
        throw Error("Can only be called as a constructor");
    }
    this.blog = blog;
}

// Example()
const e = new Example("New blog");
console.log(e.blog);