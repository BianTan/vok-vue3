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
      default: '1'
    }
  },
  emits: ['input', 'focus', 'blur'],
  setup(props, { emit }) {
    const isShow = ref(true)
    const input = (e: any) => {
      emit('input', e.target.value)
    }
    const focus = () => {
      isShow.value = false
      emit('focus')
    }
    const blur = () => {
      isShow.value = true
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
