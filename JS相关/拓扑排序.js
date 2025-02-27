const dependencies = {
    moduleA: ["moduleB", "moduleC"], // 模块A依赖于模块B和模块C
    moduleB: ["moduleC"], // 模块B依赖于模块C
    moduleC: [], // 模块C没有依赖
    moduleD: ["moduleA", "moduleB"], // 模块D依赖于模块A和模块B
};

function getLoadOrder(dependencies) {
    const visited = new Set(); // 创建一个Set来存储已经访问过的模块，防止重复访问
    const result = []; // 创建一个数组来存储模块的加载顺序

    function dfs(module) { // 定义一个深度优先搜索(DFS)函数
        if (visited.has(module)) return; // 如果当前模块已经被访问过，直接返回，避免循环依赖
        visited.add(module); // 将当前模块标记为已访问
        const deps = dependencies[module] || []; // 获取当前模块的依赖列表，如果不存在依赖，则使用空数组
        for (const dep of deps) { // 遍历当前模块的依赖列表
            dfs(dep); // 递归调用dfs函数，访问依赖模块
        }
        result.push(module); // 将当前模块添加到结果数组中，注意这里是后序添加，保证依赖先被加载
    }

    for (const module in dependencies) { // 遍历dependencies对象的所有模块
        dfs(module); // 对每个模块调用dfs函数，开始深度优先搜索
    }

    return result; // 返回模块的加载顺序
}

console.log(getLoadOrder(dependencies)); // 输出模块的加载顺序