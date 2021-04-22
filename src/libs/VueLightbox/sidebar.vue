<template>
  <div class="w-32 md:w-64 h-full bg-white overflow-hidden overflow-y-auto">
    <li
      v-for="(img, index) in list"
      :key="index"
      class="w-full md:w-1/2 h-32 cursor-pointer overflow-hidden inline-block"
      @click="handleItemClick(index)"
    >
      <img
        :src="img"
        class="h-full w-full object-cover border-4 border-transparent transition duration-300"
        :class="[{ 'border-red-400': index === currentId }]"
      />
    </li>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<string[]>,
      default: (): [] => []
    },
    currentId: {
      type: Number,
      default: 0
    }
  },
  emits: ['handleItemClick'],
  setup(props, { emit }) {
    const handleItemClick = (id: number) => emit('handleItemClick', id)

    return {
      handleItemClick
    }
  }
})
</script>
