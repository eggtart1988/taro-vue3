import Taro from '@tarojs/taro'
import { defineStore } from 'pinia'
import session from '@/servers/session'
import { CONSTANTS } from '@/servers/config'


export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      areaList: session.get(CONSTANTS.SESSION_AREA_KEY) || []
    }
  },

  actions: {
    // 获取地址信息
    async setAreaList(code) {
      if (this.areaList.length > 0) { return }
      try {
        const res = [{"name":"上城区","shortName":"","fullName":"浙江省-杭州市-上城区","description":"","code":"330102","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":977},{"name":"下城区","shortName":"","fullName":"浙江省-杭州市-下城区","description":"","code":"330103","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":978},{"name":"江干区","shortName":"","fullName":"浙江省-杭州市-江干区","description":"","code":"330104","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":979},{"name":"拱墅区","shortName":"","fullName":"浙江省-杭州市-拱墅区","description":"","code":"330105","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":980},{"name":"西湖区","shortName":"","fullName":"浙江省-杭州市-西湖区","description":"","code":"330106","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":981},{"name":"滨江区","shortName":"","fullName":"浙江省-杭州市-滨江区","description":"","code":"330108","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":982},{"name":"萧山区","shortName":"","fullName":"浙江省-杭州市-萧山区","description":"","code":"330109","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":983},{"name":"余杭区","shortName":"","fullName":"浙江省-杭州市-余杭区","description":"","code":"330110","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":984},{"name":"富阳区","shortName":"","fullName":"浙江省-杭州市-富阳区","description":"","code":"330111","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":985},{"name":"临安区","shortName":"","fullName":"浙江省-杭州市-临安区","description":"","code":"330112","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":986},{"name":"桐庐县","shortName":"","fullName":"浙江省-杭州市-桐庐县","description":"","code":"330122","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":987},{"name":"淳安县","shortName":"","fullName":"浙江省-杭州市-淳安县","description":"","code":"330127","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":988},{"name":"建德市","shortName":"","fullName":"浙江省-杭州市-建德市","description":"","code":"330182","pCode":"330100","pCodes":"[0],[000000],[330000],[330100],","id":989}]
        this.areaList = res
        session.set(CONSTANTS.SESSION_AREA_KEY, res)
        return Promise.resolve(res)
      } catch (error) {
        console.log(error);
        return Promise.reject(error)
      }
    }
  },
})