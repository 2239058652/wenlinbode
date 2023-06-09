import axios from 'axios';
import env from '../../build/env';
import { router } from '../../src/router/index';

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

const Axios = axios.create({
    baseURL: ajaxUrl,
    timeout: 10000,
    responseType: "json",
    //withCredentials: true, // 是否允许带cookie这些
    withCredentials: false, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

//POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事，显示加载中效果等
        if (
            config.method === "post" ||
            config.method === "put" ||
            config.method === "delete"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
        }

        // 若是有做鉴权token , 就给头部带上token
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    error => {
        console.log('http request error');
        // Message({
        //     //  饿了么的消息弹窗组件,类似toast
        //     showClose: true,
        //     message: error,
        //     type: "error.data.error.message"
        // });
        //return Promise.reject(error.data.error.message);
        return Promise.reject(error);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        console.log('http response');
        return res.data;
        //对响应数据做些事
        if (res.data && !res.data.success) {
            // Message({
            //     //  饿了么的消息弹窗组件,类似toast
            //     showClose: true,
            //     message: res.data.error.message.message ?
            //         res.data.error.message.message : res.data.error.message,
            //     type: "error"
            // });
            //return Promise.reject(res.data.error.message);
            return Promise.reject(res);
        } else {
            //响应成功，返回响应的数据
            return res;
        }
    },
    error => {
        console.log('http response error');
        return Promise.reject(error);
        // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
        // 直接丢localStorage或者sessionStorage
        if (!window.localStorage.getItem("loginUserBaseInfo")) {
            // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
            router.push({
                path: "/login"
            });
        } else {
            // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
            // 乖乖的返回去登录页重新登录
            let lifeTime =
                JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
                1000;
            let nowTime = new Date().getTime(); // 当前时间的时间戳
            console.log(nowTime, lifeTime);
            console.log(nowTime > lifeTime);
            if (nowTime > lifeTime) {
                Message({
                    showClose: true,
                    message: "登录状态信息过期,请重新登录",
                    type: "error"
                });
                router.push({
                    path: "/login"
                });
            } else {
                // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
                if (error.response.status === 403) {
                    router.push({
                        path: "/error/403"
                    });
                }
                if (error.response.status === 500) {
                    router.push({
                        path: "/error/500"
                    });
                }
                if (error.response.status === 502) {
                    router.push({
                        path: "/error/502"
                    });
                }
                if (error.response.status === 404) {
                    router.push({
                        path: "/error/404"
                    });
                }
            }
        }
        // 返回 response 里的错误信息
        let errorInfo = error.data.error ? error.data.error.message : error.data;
        return Promise.reject(errorInfo);
    }
);

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function(Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
    }
};