import Taro from "@tarojs/taro"
import { pageToLogin } from "@/utils"
import { HTTP_STATUS } from './config'
import session from './session'


//网络请求拦截器
// const interceptor = function (chain) {
//   const requestParams = chain.requestParams
//   const { method, data, url } = requestParams
//   let token = Taro.getStorageSync('TOKEN')//拿到本地缓存中存的token
//   requestParams.header = {
//     ...requestParams.header,
//     Authorization: 'Bearer ' + token //将token添加到头部
//   }
//   return chain.proceed(requestParams).then(res => { return res })
// }


const customInterceptor = async (chain) => {

  const requestParams = chain.requestParams

  try {
    const res = await chain.proceed(requestParams)
    // 只要请求成功，不管返回什么状态码，都走这个回调
    if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
      Taro.showModal({
        title: '请求失败',
        content: error.data.detail || error.errorMessage || '请求资源不存在',
        showCancel: false,
        success: function (res) { }
      })
      return Promise.reject(error.data.detail)

    } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
      return Promise.reject("服务端出现了问题")

    } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
      //  获取store中的token
      Taro.showModal({
        title: '请求失败',
        content: error.errorMessage || '请求发送失败，请检查网络状态',
        showCancel: false,
        success: function (res) { }
      })
      pageToLogin()
      // TODO 根据自身业务修改
      return Promise.reject("没有权限访问");

    } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      //  清空token 和 个人信息
      session.remove(CONSTANTS.SESSION_KEY)
      session.remove(CONSTANTS.SESSION_USERINFO_KEY)
      session.remove(CONSTANTS.SESSION_USERID_KEY)
      pageToLogin()
      return Promise.reject("需要鉴权")
    } else if (res.statusCode === HTTP_STATUS.SUCCESS || res.statusCode === HTTP_STATUS.CREATED) {
      return res.data
    }
  } catch (error) {
    console.log(error);
    Taro.showModal({
      title: '请求失败',
      content: error.data.detail || error.errorMessage || '请求发送失败，请检查网络状态',
      showCancel: false,
      success: function (res) { }
    })
    return Promise.reject(error)
  }
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
const interceptors = [customInterceptor, Taro.interceptors.logInterceptor, Taro.interceptors.timeoutInterceptor]

export default interceptors