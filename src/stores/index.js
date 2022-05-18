// https://pinia.esm.dev/introduction.html
import { createPinia } from 'pinia';
import { useAuthStore } from './auth';
import { useCommonStore } from './common';
import { useSettingStore } from './setting';

const pinia = createPinia();

export { useAuthStore, useCommonStore,useSettingStore };
export default pinia;

// You can even use a function (similar to a component setup()) to define a Store for more advanced use cases:
// export const useCounterStore = defineStore('counter', () => {
//   const count = ref(0)
//
//   function increment() {
//     count.value++
//   }
//
//   return {count, increment}
// })