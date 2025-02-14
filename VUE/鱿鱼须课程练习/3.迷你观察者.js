class Dep {
    constructor() {
        this.subscribers = new Set()
    }

    depend() {
        if (activeUpdate) {
            this.subscribers.add(activeUpdate)
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub())
    }
}

function observe(obj) {
    Object.keys(obj).forEach(key => {
        let internalValue = obj[key]

        const dep = new Dep()
        Object.defineProperty(obj, key, {
            // 在getter收集依赖项，当触发notify时重新运行
            get() {
                dep.depend()
                return internalValue
            },

            // setter用于调用notify
            set(newVal) {
                const changed = internalValue !== newVal
                internalValue = newVal
                if (changed) {
                    dep.notify()
                }
            }
        })
    })
    return obj
}

let activeUpdate

function autorun(update) {
    const wrappedUpdate = () => {
        activeUpdate = wrappedUpdate
        update()
        activeUpdate = null
    }
    wrappedUpdate()
    // activeUpdate = update
    // update()
    // activeUpdate = null
}

const state = {
    count: 0
}

observe(state)

autorun(() => {
    console.log(state.count)
})
// 打印"count is: 0"

state.count++

// 打印"count is: 1"