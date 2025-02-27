const arr = [1, 2, 3, 4, 5, 1, 3, 5]

// 利用filter判断元素第一次的出现位置，只返回第一次这个位置的标记对应的元素
const result1 = arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index
})
console.log(result1)

// 判断acc集合是否含有当前元素，没有的话push，有的话不操作
const result2 = arr.reduce((acc, pre) => {
    if (!acc.includes(pre)) {
        acc.push(pre)
    }
    return acc
}, [])

console.log(result2)

// 利用es6新特性 Set对象转数组 自动去重
// const result3 = [...new Set(arr)]
const result3 = Array.from(new Set(arr))

console.log(result3)