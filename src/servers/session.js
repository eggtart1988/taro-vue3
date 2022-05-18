// session管理
import Taro from '@tarojs/taro'

const session = {
    set(key, value) {
        Taro.setStorageSync(key, value)
    },

    get(key){
        return Taro.getStorageSync(key)
    },

    remove(key){
        Taro.removeStorageSync(key)
    },

    clear(){
        Taro.clearStorage()
    }
}

export default session