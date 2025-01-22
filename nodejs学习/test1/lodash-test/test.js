const _ = require('lodash')
const arr = [1, 2, 3]
const other_arr = _.concat(arr, [2], [1000])
console.log(other_arr)