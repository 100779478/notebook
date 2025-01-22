import DEFAULTS from './defaults'
import { serialize, addURLData } from './utils'
class Ajax {
    constructor(url, options) {
        this.url = url
        this.options = Object.assign({}, DEFAULTS, options)
        //初始化
        this.init()
    }
    //初始化
    init() {
        const xhr = new XMLHttpRequest()
        this.xhr = xhr
        this.bindEvents()

        xhr.open(this.options.method, this.url + this.addParam(), true)

        //设置responseType
        this.setResponseType()
        //设置跨域是否携带cookie
        this.setCookie()
        //设置超时
        this.setTimeout()

        //发送请求
        this.sendData()
        xhr.send()
    }
    //绑定事件处理
    bindEvents() {
        const xhr = this.xhr

        const { success, httpCodeError, error, abort, timeout } = DEFAULTS
        //load
        xhr.addEventListener(
            'load',
            () => {
                if (this.ok()) {
                    console.log(xhr.responseText)
                    success(xhr.responseText, xhr)
                } else {
                    httpCodeError(xhr.status, xhr)
                }
            },
            false
        )
        //error
        xhr.addEventListener(
            'error',
            () => {
                error(xhr)
            },
            false
        )
        //abort
        xhr.addEventListener(
            'abort',
            () => {
                abort(xhr)
            },
            false
        )
        //timeout
        xhr.addEventListener(
            'timeout',
            () => {
                timeout(xhr)
            },
            false
        )
    }
    ok() {
        const xhr = this.xhr
        return (xhr.status >= 200 && xhr.status < 300) || xhr.status === 304
    }

    addParam() {
        const { params } = this.options
        if (!params) return ''

        return addURLData(this.url, serialize(params))
    }
    setResponseType() {
        this.xhr.responseType = this.options.responseType
    }
    setCookie() {
        if (this.options.withCredentials)
            this.xhr.withCredentials = true
    }
    setTimeout() {
        const { timeoutTime } = this.options
        if (timeoutTime > 0) {
            this.xhr.timeout = timeoutTime
        }
    }
    sendData() {
        const xhr = this.xhr

        isSendData = () => {
            const { data, method } = this.options
            if (!data) return false;
            if (method.toLowerCase() === 'get') return false
        }
    }
}

export default Ajax;