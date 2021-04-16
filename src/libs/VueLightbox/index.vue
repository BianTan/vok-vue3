<template>
  <transition-default>
    <div
      class="fixed top-0 left-0 w-full h-full overflow-hidden z-50 bg-gray-800 bg-opacity-80 select-none"
      v-show="isShow && data.length > 0"
    >
      <div class="flex h-full w-full">
        <div class="flex-1 relative" @click="handleClick">
          <transition-group-default>
            <img
              v-for="(img, index) in data"
              :key="index"
              :src="img"
              v-show="index === currentId"
              @click="isButtonShow = !isButtonShow"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-9/10 max-h-9/10 cursor-pointer"
            />
          </transition-group-default>
          <transition-default>
            <div v-show="isButtonShow">
              <span class="absolute top-2 left-2 text-white text-xs"
                >{{ currentId + 1 }} / {{ data.length }}</span
              >
              <iconfont
                @click="goPrev"
                class="icon-down left-4 top-1/2 transform -translate-y-1/2 rotate-90"
              />
              <iconfont
                @click="goNext"
                class="icon-down right-4 top-1/2 transform -translate-y-1/2 -rotate-90"
              />
              <iconfont
                class="icon-close right-0 top-0"
                @click="isShow = sidebarIsShow = false"
              />
              <iconfont
                class="icon-menu right-11 top-0"
                @click="switchSidebarState"
              />
            </div>
          </transition-default>
        </div>
        <sidebar
          :list="data"
          v-if="sidebarIsShow"
          :currentId="currentId"
          @handleItemClick="onSidebarItemClick"
        />
      </div>
    </div>
  </transition-default>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRefs, watch } from 'vue'
import { throttle } from './utlis'
import TransitionDefault from '@/components/transition/TransitionDefault.vue'
import TransitionGroupDefault from '@/components/transition/TransitionGroupDefault.vue'
import iconfont from './iconfont.vue'
import Sidebar from './sidebar.vue'

export default defineComponent({
  name: 'VueLightbox',
  components: {
    TransitionDefault,
    TransitionGroupDefault,
    iconfont,
    Sidebar
  },
  props: {
    data: {
      type: Array as PropType<string[]>,
      default: []
    },
    buttonShowTime: {
      type: Number,
      default: 2300
    }
  },
  setup(props) {
    const state = reactive({
      isShow: false,
      sidebarIsShow: false,
      isLoaded: false,
      isButtonShow: false,
      currentId: 0,
      timer: null
    })

    const resetTimer = () => {
      if (state.isButtonShow) {
        clearTimeout(state.timer)
        state.timer = setTimeout(
          () => (state.isButtonShow = false),
          props.buttonShowTime
        )
      }
    }
    const openLightbox = (id = '0') => {
      state.currentId = parseInt(id)
      state.isShow = true
      state.isButtonShow = true
    }
    const handleClick = (e: any) => {
      if (e.target === e.currentTarget)
        state.sidebarIsShow
          ? (state.sidebarIsShow = false)
          : (state.isShow = false)
    }
    const onSidebarItemClick = (id: number) => {
      state.currentId = id
      resetTimer()
    }
    const goPrev = () => {
      state.currentId > 0
        ? state.currentId--
        : (state.currentId = props.data.length - 1)
      resetTimer()
    }
    const goNext = () => {
      state.currentId < props.data.length - 1
        ? state.currentId++
        : (state.currentId = 0)
      resetTimer()
    }
    const switchSidebarState = () => {
      state.sidebarIsShow = !state.sidebarIsShow
      resetTimer()
    }

    const keydown = (e: any) => {
      const type = e[0].code
      switch (type) {
        case 'ArrowLeft':
          goPrev()
          break
        case 'ArrowRight':
          goNext()
          break
        case 'Escape':
        case 'Space':
          e[0].preventDefault()
          state.isShow = false
          break
      }
    }
    const throttleKeydoen = throttle(keydown)
    const buttonShow = () => {
      if (state.isButtonShow) {
        resetTimer()
      }
      state.isButtonShow = true
    }
    const throttleShow = throttle(buttonShow, props.buttonShowTime)

    watch([() => state.isButtonShow, () => state.isShow], newValue => {
      if (newValue[0]) {
        // 这个是 isButtonShow
        state.timer = setTimeout(
          () => (state.isButtonShow = false),
          props.buttonShowTime
        )
      } else if (!newValue[0]) {
        clearTimeout(state.timer)
      }
      if (newValue[1]) {
        // 这个是 isShow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', throttleKeydoen)
        window.addEventListener('mousemove', throttleShow)
      } else if (!newValue[1]) {
        document.body.style.overflow = 'auto'
        window.removeEventListener('keydown', throttleKeydoen)
        window.removeEventListener('mousemove', throttleShow)
      }
    })

    return {
      ...toRefs(state),
      openLightbox,
      handleClick,
      onSidebarItemClick,
      goPrev,
      goNext,
      switchSidebarState
    }
  }
})
</script>
