# Vue 响应式系统原理

Vue 的响应式系统是基于 **发布-订阅模式** 实现的，核心是通过 **依赖收集** 和 **派发更新** 来管理数据的响应式变化。以下是其核心原理和流程的详细说明。

## 核心三要素

### 1. Dep（依赖管理器）
每个响应式属性都会有一个对应的 `Dep` 实例。

负责管理依赖（`Watcher`），提供以下方法：
- `depend()`：收集当前的 `Watcher`。
- `notify()`：通知所有 `Watcher` 更新。

### 2. Watcher（观察者）
负责监听数据的变化，并在数据变化时执行回调。

可以是：
- **模板渲染 Watcher**（用于更新视图）。
- **用户自定义的 Watcher**（通过 `watch` 选项或 `$watch` 方法创建）。
- **`computed` 属性的 Watcher**。

在初始化时会执行一次 `getter`，触发依赖收集。

### 3. Observer（观察者）
负责将普通对象转换为响应式对象。

- 通过 `Object.defineProperty`（Vue 2.x）或 `Proxy`（Vue 3.x）劫持属性的 `get` 和 `set` 操作。
- 递归地遍历对象的所有属性，确保嵌套属性也是响应式的。

## 流程

### 1. 初始化阶段
- `Observer` 对数据对象进行递归遍历，劫持每个属性的 `get` 和 `set` 操作。
- 在 `get` 中，调用 `Dep.depend()` 收集当前的 `Watcher`。
- 在 `set` 中，调用 `Dep.notify()` 通知所有依赖的 `Watcher` 更新。

### 2. 依赖收集
- 当 `computed` 属性或模板渲染等副作用函数被访问时，会创建一个 `Watcher`。
- `Watcher` 在初始化时会执行一次 `getter` 函数，触发依赖属性的 `get` 操作。
- 在 `get` 操作中，`Dep.depend()` 会将当前的 `Watcher` 添加到依赖列表中。

### 3. 派发更新
- 当依赖的响应式属性发生变化时，会触发 `set` 操作。
- 在 `set` 操作中，`Dep.notify()` 会通知所有依赖的 `Watcher` 更新。
- `Watcher` 收到通知后，会重新执行 `getter` 函数，完成视图更新或 `computed` 属性的重新计算。

## 代码示例
以下是 Vue 2.x 中响应式系统的简化实现：

```javascript
// Dep 依赖管理器
class Dep {
  constructor() {
    this.subscribers = []; // 存储 Watcher
  }

  // 收集依赖
  depend() {
    if (Dep.target) {
      this.subscribers.push(Dep.target);
    }
  }

  // 派发更新
  notify() {
    this.subscribers.forEach(watcher => watcher.update());
  }
}

// Watcher 观察者
class Watcher {
  constructor(getter) {
    this.getter = getter;
    this.value = this.get(); // 初始化时执行一次 getter
  }

  // 获取值并收集依赖
  get() {
    Dep.target = this; // 设置当前 Watcher
    const value = this.getter(); // 执行 getter，触发依赖收集
    Dep.target = null; // 清空当前 Watcher
    return value;
  }

  // 更新
  update() {
    this.value = this.get();
    console.log('Watcher 更新了！');
  }
}

// Observer 观察者
function observe(data) {
  Object.keys(data).forEach(key => {
    let value = data[key];
    const dep = new Dep(); // 每个属性都有一个 Dep

    Object.defineProperty(data, key, {
      get() {
        dep.depend(); // 收集依赖
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          dep.notify(); // 派发更新
        }
      },
    });
  });
}

// 测试
const data = { count: 0 };
observe(data); // 将 data 转换为响应式

new Watcher(() => {
  console.log('Watcher 执行了，count:', data.count);
});

data.count = 1; // 输出: Watcher 执行了，count: 1