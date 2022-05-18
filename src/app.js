import { createApp } from 'vue'
import { Button, Toast } from '@nutui/nutui-taro';
import pinia from '@/stores'
import { useSettingStore, useAuthStore, useCommonStore } from '@/stores'
import './app.scss'

const App = createApp({
  onShow (options) {
    const setting = useSettingStore()
    const auth = useAuthStore()
    const common = useCommonStore()
    // 初始化一些常用数据
    common.setAreaList()
    // 设置标题栏高度
    setting.setStatusBarHeight()
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(pinia).use(Button).use(Toast)

export default App
