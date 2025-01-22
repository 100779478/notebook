# **EventBus**是**组件**消息传递的一种方式，基于一个消息中心，订阅和发布消息的模式，称为发布订阅者模式(全局事件总线)。

### 功能和优势

* 通过解耦发布者和订阅者简化Android事件传递；
* 用于线程间的通讯代替handler或用于组件间的通讯代替Intent;
* 简化了组件间的通讯;
* 分离了事件的发送者和接受者;
* 在Activity、Fragment和线程中表现良好;
* 避免了复杂的和易错的依赖关系和生命周期问题;
* 使得代码更简洁,性能更好;

### EventBus原理

![](https://s5.51cto.com/oss/202107/21/50c5f94b574346045f2dafb62c20b0be.png)

### EventBus 背后的实现原理主要包括如下几个方面的内容：

* Subscribe注解
* 注册事件订阅方法
* 取消注册
* 发送事件
* 事件处理

1. Event.js封装代码

```js
class Event{
    constructor(){
      this.callbacks = {}
    }
    //解除监听 用的比较少
    $off(name){
      this.callbacks[name] = null
    }
    //提交通信封装
    $emit(name, ...args){
      let cbs = this.callbacks[name]
      if (cbs) {
        cbs.forEach(c=>{
          c.call(this, ...args)
        })
      }
    }
    //监听封装
    $on(name, fn){
      (this.callbacks[name] || (this.callbacks[name] = [])).push(fn)
    }
  }
  export default new Event()

```

2. 需要监听通讯的组件

```js
import Bus from "../../utils/Event";
export default {
  created() {
    Bus.$on("set_message", (obj) => {
      console.log("收到的信息名字:"+obj.name+"收到的信息值:"+obj.value)
    });
  },
};

```

3. 发起通讯的组件

```js
import Bus from "../../utils/Event";
export default {
  created() {
    Bus.$emit("set_message", {
      name: "我的名字",
      value: "值",
    });
  },
};

```

4. 通讯结束后需要关闭事件

> 避免内存泄露：如果EventBus上的事件器没有被移除，当组件销毁时，这些监听器仍然存在，可能导致内存泄露
>
> 防止事件冲突：如果多个组件共用同一个 EventBus，而没有妥善管理事件的订阅和取消订阅，可能会导致事件冲突，影响程序的稳定性

```js
Bus.$off("set_message")
```

