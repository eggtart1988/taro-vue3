/**
 * pages页面快速生成脚本 
 * 用法：npm run com `文件名`
 */
const fs = require('fs');
const dirName = process.argv[2];
const capPirName = dirName.substring(0, 1).toUpperCase() + dirName.substring(1);
if (!dirName) {
    console.log('文件夹名称不能为空！');
    console.log('示例：npm run com test');
    process.exit(0);
}
//页面模板
const indexTep = `<template>
<view :class="styles['container']">

</view>
</template>

<script>
import styles from './${dirName}.module.scss'
import { reactive, toRefs, onMounted, computed } from 'vue';
import Taro, { usePullDownRefresh, useReady, useDidShow } from '@tarojs/taro'
export default {
name: '${dirName}',
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
.container {

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
fs.mkdirSync(`./src/components/${capPirName}`); // mkdir $1
process.chdir(`./src/components/${capPirName}`); // cd $1
fs.writeFileSync(`index.vue`, indexTep); //vue
fs.writeFileSync(`${dirName}.module.scss`, scssTep); // scss
//  fs.writeFileSync(`${dirName}.interface.ts`, interfaceTep); // interface