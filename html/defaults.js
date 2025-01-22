const DEFAULTS = {
    method: 'GET',
    params: null,
    // params:{
    //     username:'qqq',
    //     age:11
    // }
    // username=alex&age=11
    data: null,
    // data:{
    //     username:'qqq',
    //     age:11
    // }
    // data:FormData 数据
    contentType: 'application/x-www-form-urlencoded',
    responseType: '',
    timeoutTime: 0,
    withCredentials: false,

    //方法
    success(){},
    httpCodeError(){},
    error(){},
    abort(){},
    timeout(){},
}

export default DEFAULTS