class Dep {
    constructor() {
        this.subscribers = new Set()
    }

    // 当前正在执行的代码
    depend(params) {
        if (!this.subscribers.has(params)) {
            this.subscribers.add(params)
        }
    }

    // 依赖发生改变
    notify() {
        this.subscribers.forEach(fn => fn())
    }
}

const dep = new Dep()

function autorun(update) {
    dep.depend(update)
    update()
}

autorun(() => {
    console.log('函数1111')
})
autorun(() => {
    console.log('函数2222')
})

dep.notify()