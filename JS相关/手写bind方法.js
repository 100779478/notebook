Function.prototype.myCall = function (ctx, ...args) {
    ctx = ctx || 'window'
    let key = Symbol()
    ctx[key] = this
    const result = ctx[key](...args)
    delete ctx[key]
    return result
}