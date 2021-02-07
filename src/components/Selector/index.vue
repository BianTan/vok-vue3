<template>
  <div class="relative h-8 leading-8 px-3 inline-block">
    <search-input :value="inputValue" @input="input" @focus="focus" @blur="blur"/>
    <transition-default class="duration-75">
      <search-menu v-if="isShow" :searchValue="inputValue" :data="data" @itemClick="handleItemClick"/>
    </transition-default>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, watchEffect } from 'vue'
import TransitionDefault from '../transition/TransitionDefault.vue'
import SearchInput from './input.vue'
import SearchMenu from './menu.vue'

interface DataProps {
  id: number;
  value: string;
  text: string;
}
export default defineComponent({
  components: {
    SearchInput,
    SearchMenu,
    TransitionDefault
  },
  props: {
    value: String,
    data: Array as PropType<DataProps[]>,
    currentId: {
      type: String,
      default: "0"
    }
  },
  emits: ['menuClick'],
  setup(props, { emit }) {
    const state = reactive({
      inputValue: '', // 输入框的 value
      saveValue: '',  // 保存的 value
      isShow: false,  // 控制儿子👦 menu 是否显示用哒 
      isItemClick: false  // menu 的 li 有没有点击鸭
    })

    const input = (value: string) => state.inputValue = value // 设置 input 为：输入框的 value（上面传给了儿子👦 input.vue）
    const focus = (value: string) => {  // input 获得焦点
      state.saveValue = value // 拿到儿子发来的还没修改的 value
      state.isShow = true // 显示 search-menu 组件 （menu.vue）
    }
    const blur = () => {  // input 失去焦点
      setTimeout(() => {  // 延时 50 毫秒
        if(!state.isItemClick) {  // 如果 menu 的 li 没点击过
          state.inputValue = state.saveValue  // 设置 input 的 value 为：上面保存的 value
        }
        state.isShow = state.isItemClick = false  // 把 menu 隐藏掉，再把 isItemClick 设置为初始值 false，免得下次不触发上面👆的判断出 BUG🐛 👴最讨厌 BUG了
      }, 50)
    }
    const handleItemClick = (res: any) => { // menu 的 li 点击啦！！！ res：[value, text]
      setTimeout(() => {
        state.inputValue = res[1] // 设置 input 框的 value 为：上面👆点击 li 获取的 text
      }, 75); // 加入延时是因为 menu 隐藏显示会有延时。这里不添加延时会造成 menu 搜索抖动的问题
      state.isItemClick = true  // 告诉楼上你点击啦！
      emit('menuClick', res)  // 把点击 menu 的获取的大宝贝给发出去
    }

    watchEffect(() => {
      const id = parseInt(props.currentId)  // 获取当前id
      if(props.data && props.data[id]) state.inputValue = props.data[id].text // 设置输入框的 value
    })
    return {
      ...toRefs(state),
      input,
      focus,
      blur,
      handleItemClick
    }
  }
})
</script>
