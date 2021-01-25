<template>
  <div class="bg-white h-screen w-2/3 md:w-72 shadow-lg z-40 transition ease-in-out duration-300">
    <ul class="mt-20 lg:mt-36 space-y-3 relative">
      <span class="w-1 h-10 bg-admin-blue-500 absolute right-0 z-10 top-2 transition ease-in-out duration-300" ref="spanRef"/>
      <slot/>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()

export default defineComponent({
  setup() {
    const spanRef = ref<HTMLElement | null>(null) // 滑块的 refs
    const activeIndex = ref(1)  // 设置好 activeIndex
    provide('activeIndex', activeIndex) // 提供 activeIndex

    const setCurrentId = (id: number) => {
      if(id) activeIndex.value = id // 把 activeIndex 设置为传入的 menuItemId
      if(spanRef.value) {
        spanRef.value.style.transform = `translateY(${(id - 1) * 68}px)`  // 设置滑块位置
      }
    }
    emitter.on('adminMenuChange', id => setCurrentId(id))  // 接受当前 menuItem 的点击事件
    return {
      spanRef
    }
  }
})
</script>