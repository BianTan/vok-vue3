<template>
  <teleport to='#sidebar-menu'>
    <div v-show="topBtnShow" @click="handleBackTopClick" class="fixed cursor-pointer transition ease-in-out duration-200 right-8 bottom-18 w-11 h-11 leading-11 text-center rounded shadow hover:shadow-lg bg-white text-gray-400">
      <i class="iconfont icon-top"/>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, onUnmounted } from 'vue'
interface BackTopProps {
  scrollTop: number;
  topBtnShow: boolean;
  handleBackTopClick: () => void;
  scrollToTop: () => void;
}

export default defineComponent({
  setup() {
    const backTop: BackTopProps = reactive({
      scrollTop: 0,
      topBtnShow: false,
      handleBackTopClick: () => {
        const timer = setInterval(() => {
          const ispeed = Math.floor(-backTop.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = backTop.scrollTop + ispeed
          if (backTop.scrollTop <= 0) {
            clearInterval(timer)
          }
        }, 16)
      },
      scrollToTop: () => {
        const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        backTop.scrollTop = windowScrollTop
        if (backTop.scrollTop > 0) {
          backTop.topBtnShow = true
        } else {
          backTop.topBtnShow = false
        }
      }
    })
    onMounted(() => {
      document.addEventListener('scroll', backTop.scrollToTop)
    })
    onUnmounted(() => {
      document.removeEventListener('scroll', backTop.scrollToTop)
    })
    return {
      ...toRefs(backTop)
    }
  }
})
</script>
