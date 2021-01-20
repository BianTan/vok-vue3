<template>
  <teleport to='#sidebar-menu'>
    <div v-show="isShow" @click="handleBackTopClick" class="fixed cursor-pointer transition ease-in-out duration-200 right-8 bottom-18 w-11 h-11 leading-11 text-center rounded shadow-md hover:shadow-lg bg-white text-gray-400">
      <i class="iconfont icon-top"/>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, toRefs} from 'vue'
import useScrollTo from '@/utlis/useScrollTo'

export default defineComponent({
  setup() {
    const funcMenu = reactive({
      isShow: false,
      handleBackTopClick: () => useScrollTo()
    })
    const scrollTop = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      funcMenu.isShow = scrollTop > 0
    }
    onMounted(() => {
      document.addEventListener('scroll', scrollTop)
    })
    onUnmounted(() => {
      document.addEventListener('scroll', scrollTop)
    })
    return {
      ...toRefs(funcMenu)
    }
  }
})
</script>
