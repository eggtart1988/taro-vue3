// 支付宝原生api封装为可以使用promise的函数

const TaroAlipay = {}

const apiList = ['alert', 'getAuthCode', 'getPhoneNumber','uploadFile','openLocation','getLocation']

apiList.forEach((api) => {
    TaroAlipay[api] = (options = {}) => {
        return new Promise((resolve, reject) => {
            const { success, fail } = options
            const args = {
                ...options,
                success: (res) => {
                    success && success(res)
                    resolve(res)
                },
                fail: (err) => {
                    fail && fail(err)
                    reject(err)
                }
            }
            my[api](args)
        })
    }
})

export default TaroAlipay