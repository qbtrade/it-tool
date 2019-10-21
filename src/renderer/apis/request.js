import axios from 'axios'

// 创建axios实例
// 这样配置base_url更加好，在request的interceptors里面搞，相对差一点
const service = axios.create({
  // 但是一般这个不用吧，esaymock这种蛮好的
  // baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

const errorHandle = (status, message, code) => {
  // 状态码判断
  switch (status) {
    case 400:
      console.log('error message', message)
      break
    // 401: 未登录状态，跳转登录页
    case 401:
      break
      // 403 token过期
      // 清除token并跳转登录页
    case 403:
      break
      // tip('登录过期，请重新登录')
      // 404请求不存在
    case 404:
      // tip('请求的资源不存在')
      break
    default:
      // console.log(other)
  }
}
// request拦截器
// service.interceptors.request.use(
//   config => {
//     return config
//   },
//   error => {
//     Promise.reject(error)
//   }
// )

// response 拦截器
service.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      const { status, data } = response
      const message = status < 500 ? (data ? data.message : '未知错误') : `${status}: 服务器错误，请联系客服`
      const code = status < 500 ? (data ? data.code : '未知错误代码') : 'internal server error'
      // 对于一些假如可以统一处理，比如说弹框这些，这里直接做了，省的在每个catch里面写了
      errorHandle(status, message, code)
      return Promise.reject({
        status, message, code
      })
    } else {
      // 处理断网和请求超时的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false)
      // 手动给个400

      let status = 444 // 444乱给的，想不到了，嘿嘿
      let code = 'unknown error'
      let message = 'unknown error'
      if (error.message) {
        if (error.message.includes('Network Error')) {
          status = 400
          code = 'Network Error'
          message = '请检查您的网络连接情况'
        } else if (error.message && error.message.includes('timeout')) {
          status = 400
          code = 'timeout'
          message = '请求超时！'
        }
      }
      errorHandle(status, message, code)
      return Promise.reject(error)
    }
  }

)

export default service
