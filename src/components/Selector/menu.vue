<template>
  <div class="absolute top-10 left-0 w-full px-3 z-20">
    <ul class="bg-white shadow rounded-md overflow-hidden text-center">
      <li class="text-sm h-10 leading-10 cursor-pointer hover:bg-opacity-80 hover:bg-gray-100 transition ease-in-out duration-300"
        v-for="item in data"
        :key="item.id"
        @click="itemClick([item.value, item.text])">{{item.text}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  emits: ['itemClick'],
  setup(props, { emit }) {
    const itemClick = (res: any) => {
      emit('itemClick', res)
    }
    return {
      itemClick
    }
  }
})
</script>
