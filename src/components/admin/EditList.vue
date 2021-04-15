<template>
  <div class="space-y-4" v-if="pageComputed">
    <slot />
    <div
      class="flex items-center justify-between select-none px-1"
      v-if="pageComputed !== 1"
    >
      <p class="text-admin-blue-600">{{ currentPage }} / {{ pageComputed }}</p>
      <div class="space-x-6">
        <button
          @click.prevent="prevClick"
          class="focus:outline-none bg-white shadow px-3 py-2 rounded"
          :disabled="currentPage <= 1"
        >
          <i
            class="text-admin-blue-600 iconfont icon-top block transform -rotate-90"
          />
        </button>
        <button
          @click.prevent="nextClick"
          class="focus:outline-none bg-white shadow px-3 py-2 rounded"
          :disabled="currentPage === pageComputed"
        >
          <i
            class="text-admin-blue-600 iconfont icon-top block transform rotate-90"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { PageEventsProps } from '@/types'

export default defineComponent({
  props: {
    pageSize: {
      type: Number,
      default: 6
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 1
    }
  },
  emits: {
    prevClick: null,
    nextClick: null,
    currentChange: null
  },
  setup(props, { emit }) {
    const emitEvents: PageEventsProps = reactive({
      prevClick: () => emit('prevClick'), // 上一页按钮被点击了
      nextClick: () => emit('nextClick'), // 下一页按钮被点击了
      currentChange: (value: Number) => {
        // 页码发生了改变（传入当前点击的按钮index）
        if (value !== props.currentPage) emit('currentChange', value) // 点击的 index 和传入的 currentPage 不一致才发送信息
      }
    })
    const pageComputed = computed(() => {
      // 获取页数
      return Math.ceil(props.total / props.pageSize) // 总数除以每页展示的数量
    })
    const isActivate = (value: Number) => {
      // 是否是激活状态
      if (value === props.currentPage)
        return 'cursor-default border-blue-800 bg-blue-800 text-white hover:text-white'
      return 'cursor-pointer border-gray-200 bg-white text-gray-800 hover:text-blue-800 hover:border-blue-800'
    }
    return {
      ...toRefs(emitEvents),
      pageComputed,
      isActivate
    }
  }
})
</script>
