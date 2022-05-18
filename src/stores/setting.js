// https://pinia.esm.dev/introduction.html
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'

export const useSettingStore = defineStore('setting', {
    state: () => {
      return {
        statusBarHeight: null,
      }
    },
  
    actions: {
      async setStatusBarHeight() {
        try {
          const res = Taro.getSystemInfoSync()
          this.statusBarHeight = res.statusBarHeight
        } catch (error) {
          console.log(error);
        }
      }
    },
  })
  