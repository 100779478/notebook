Function.prototype.myApply = function (ctx, arr) {
    ctx = ctx || window
    let key = Symbol()
    ctx[key] = this
    const restult = ctx[key](...arr)
    delete ctx[key]
    return restult
}


const person = {
    name: 'Alice'
};

function greet(...message) {
    console.log(message)
    console.log(`${message}, ${this.name}`);
}

greet.myApply(person, ['hello', '1', '2']);