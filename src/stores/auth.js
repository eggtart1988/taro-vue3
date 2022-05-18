
import Taro from '@tarojs/taro'
import { defineStore } from 'pinia';
import session from '@/servers/session'
import { CONSTANTS } from '@/servers/config'

export const useAuthStore = defineStore('auth', {
    state: () => {
      return {
        token: session.get(CONSTANTS.SESSION_KEY) || '',
        userInfo: session.get(CONSTANTS.SESSION_USERINFO_KEY) || {}
      }
    },
    getters: {
      getUserLocation(state) {
        return state.userLocation
      },
      getUserSession(state) {
        return state.token
      }
    },
    actions: {
      setToken(token) {
        this.token = token
        session.set(CONSTANTS.SESSION_KEY, token)
        if (token) { this.getUserInfo() }
      },
  
      setUserInfo(userInfo) {
        this.userInfo = userInfo
        session.set(CONSTANTS.SESSION_USERINFO_KEY, userInfo)
      },

      // 获取用户信息
      async getUserInfo() {
        try {
          this.setUserInfo('res')
          return Promise.resolve('res')
        } catch (error) {
          console.log(error);
          return Promise.reject(error)
        }
      },
  
      async login(code) {
        // 获取用户id
        try {
          this.setUserId('')
          this.setUserInfo('')
          return Promise.resolve('res')
        } catch (error) {
          console.log(error);
          return Promise.reject(error)
        }
      } 
    },
  })