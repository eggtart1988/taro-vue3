<template>
<view :class="styles['container']">
    我的
    <nut-toast :msg="msg" v-model:visible="show" :type="type" :cover="cover" />
    <TagGroup v-model="areaCode">
        <Tags class="tags" :label="item.name" :value="item.code" width="105" v-for="item in areaList" :key="item.code" />
    </TagGroup>
</view>
</template>

<script>
import styles from "./index.module.scss"
import { useCommonStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { reactive, toRefs } from 'vue';
import TagGroup from '@/components/TagGroup'
import Tags from '@/components/Tags'
export default {
  name: 'Owner',
  components: {
    Tags, TagGroup,
  },
  setup(){
      const common = useCommonStore()
    const state = reactive({
      msg: '欢迎使用 NutUI3.0 开发小程序',
      msg2: '你成功了～',
      type: 'text',
      show: false,
      cover: false,
      areaCode:'330102'
    });

    const handleClick = (type, msg, cover = false) => {
      state.show = true;
      state.msg2 = msg;
      state.type = type;
      state.cover = cover;
    };

    return {
      ...toRefs(state),
      ...storeToRefs(common),
      styles,
      handleClick
    }
  }
}
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
