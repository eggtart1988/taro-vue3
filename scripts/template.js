/**
 * pages页面快速生成脚本 
 * 用法：npm run tep `文件名`
 */
const fs = require('fs');
const pathName =  process.argv[2];
const dirName = process.argv[3];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run tep test');
    process.exit(0);
}
//页面模板

const indexTep = `
 <template>
    <view :class="styles['container']">

    </view>
</template>

<script>
import styles from './${dirName}.module.scss'
import { reactive, toRefs, onMounted, computed } from 'vue';
import Taro, { usePullDownRefresh, useReady, useDidShow } from '@tarojs/taro'
export default {
    name: '${capPirName}',
    setup(props) {
        const state = reactive({

        });

        computed(() => {

        })

        useDidShow(() => {

        })

        useReady(() => {

        })

        onMounted(() => {

        })

        return {
            ...toRefs(state),
            styles
        }
    }
}
</script>
`

// scss文件模版
const scssTep = `
 :global(page){
    background:#fff;
    min-height: 100vh;
 }
.container {

 }
 `
// config 接口地址配置模板
const configTep = `
export default definePageConfig({
    navigationBarTitleText: '',
    pullRefresh: false
})
 `
// 接口请求模板
const serviceTep = `
 import Api from '@/utils/request'
 export const testApi = data => Api.test(
   data
 )
 `
//model模板
const modelTep = `
 // import Taro from '@tarojs/taro';
 import * as ${dirName}Api from './service';
 export default {
   namespace: '${dirName}',
   state: {
   },
   effects: {},
   reducers: {}
 }
 `
const interfaceTep = `
 /**
  * ${dirName}.state 参数类型
  *
  * @export
  * @interface ${capPirName}State
  */
 export interface ${capPirName}State {}
 /**
  * ${dirName}.props 参数类型
  *
  * @export
  * @interface ${capPirName}Props
  */
 export interface ${capPirName}Props {}
 `
fs.mkdirSync(`./src/${pathName}/${dirName}`); // mkdir $1
process.chdir(`./src/${pathName}/${dirName}`); // cd $1
fs.writeFileSync(`index.vue`, indexTep); //vue
fs.writeFileSync(`${dirName}.module.scss`, scssTep); // scss
fs.writeFileSync('index.config.js', configTep); // config
//  fs.writeFileSync('service.js', serviceTep); // service
// fs.writeFileSync('model.ts', modelTep); // model
// fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface
process.exit(0);