<template>
  <div class="space-y-12">
    <slot/>
    <div class="my-14 flex items-center justify-center select-none space-x-4">
      <article-button @click.prevent="prevClick">&lt;</article-button>
      <ul class="flex">
        <li v-for="item in pageComputed"
          :key="item"
          @click="currentChange(item)"
          :class="isActivate(item)"
          class="text-center leading-10 h-10 w-10 text-base font-medium rounded border transition ease-in-out duration-200">
          {{item}}
        </li>
      </ul>
      <article-button @click.prevent="nextClick">&gt;</article-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from 'vue'
import { PageEventsProps } from '../../types'
import ArticleButton from './ArticleButton.vue'

export default defineComponent({
  components: {
    ArticleButton
  },
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
      prevClick: () => emit('prevClick'),
      nextClick: () => emit('nextClick'),
      currentChange: (value: Number) => {
        if(value !== props.currentPage) emit('currentChange', value)
      },
    })
    const pageComputed = computed(() => {
      return Math.ceil(props.total / props.pageSize)
    })
    const isActivate = (value: Number) => {
      if(value === props.currentPage) return 'cursor-default border-blue-800 bg-blue-800 text-white hover:text-white'
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
