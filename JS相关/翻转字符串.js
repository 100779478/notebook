const str = 'abcdefg'

const newStr1 = str.split('').reverse().join('')
console.log(newStr1)

const newStr2 = str.split('').reduce((str, cur) => {
    return cur + str
})
console.log(newStr2)