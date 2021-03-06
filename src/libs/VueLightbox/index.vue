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
import { computed, defineComponent, PropType, toRefs } from 'vue'
import { useLightBox } from './common'
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
      default: (): [] => []
    },
    buttonShowTime: {
      type: Number,
      default: 2300
    }
  },
  setup(props) {
    
    const dataInit = computed(() => props.data as string[])

    const {
      state,
      openLightbox,
      handleClick,
      onSidebarItemClick,
      goPrev,
      goNext,
      switchSidebarState
    } = useLightBox(props.buttonShowTime as number, dataInit)

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
