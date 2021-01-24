<template>
  <div class="border px-3 rounded-md relative cursor-pointer">
    <input
      class="top-0 left-0 outline-none text-sm w-32"
      type="text"
      :class="[{'cursor-pointer': isShow}, {'cursor-text': !isShow}]"
      :value="value"
      @input="input"
      @focus="focus"
      @blur="blur"
    />
    <i class="iconfont" :class="[{'icon-down': isShow}, {'icon-search': !isShow}]"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    }
  },
  emits: ['input', 'focus', 'blur'],
  setup(props, { emit }) {
    const isShow = ref(true)

    const input = (e: any) => {
      emit('input', e.target.value) // 触发 input，把 value 发送给粑粑👨
    }
    const focus = () => {
      isShow.value = false  // 控制鼠标 icon 的，看上面 class
      emit('focus', props.value)
    }
    const blur = () => {
      isShow.value = true // 同上
      emit('blur')
    }
    return {
      isShow,
      input,
      focus,
      blur
    }
  }
})
</script>
