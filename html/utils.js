//工具函数
const serialize = param => {
    const results = []

    for (const [key, value] of Object.entries(param)) {
        results.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
    return results.join('&')
}
//给URL添加参数
const addURLData = (url, data) => {
    if (!data) return ''
    const mark = url.include('?') ? '&' : '?'

    return `${mark}${data}`
}

//
const isSendData = () => {
    
}
export { serialize, addURLData, isSendData}