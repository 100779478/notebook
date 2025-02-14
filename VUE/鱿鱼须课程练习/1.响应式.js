const obj = {foo: '123'}

function convert(obj) {
    for (const objKey in obj) {
        let oldValue = obj[objKey]
        Object.defineProperty(obj, objKey, {
            get() {
                console.log(`get is running ${oldValue}`)
                return oldValue
            },
            set(newValue) {
                console.log(`set is running ${oldValue} to ${newValue}`)
                oldValue = newValue
            }
        })
    }
}

convert(obj)
obj.foo
obj.foo = '45226'
obj.foo


const str = ['1111', '2222', '3333', '4444', '123']
let arr = str.pop()
console.log(arr, str, 1111)