const arr = [[1, 2], [3, 4, 5], [[6, 7, [8, 9, 10]], [11, 12, 13], [14], [15, 16]]];


function fn1(list) {
    let newList = []
    list.forEach(item => {
        if (Array.isArray(item)) {
            newList = newList.concat(fn(item))
        } else {
            newList = newList.concat(item)
        }
    })
    return newList
}


function fn2(list) {
    return list.reduce((result, element) => {
        if (Array.isArray(element)) {
            return result.concat(fn(element))
        } else {
            return result.concat(element)
        }
    }, [])
}


// fn(arr)
console.log(fn1(arr))
// 输出 [1,2,3,4,5,6,7,8,9,10, 11, 12, 13, 14, 15, 16]