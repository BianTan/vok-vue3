<template>
  <div
    :class="classAry"
    class="z-50 w-11/12 md:w-auto border-t-4 rounded-b px-6 py-3 shadow-md fill-current fixed top-10 left-1/2 transform -translate-x-1/2"
  >
    <div class="flex items-center">
      <div class="py-1">
        <svg
          class="h-6 w-6 mr-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"
          ></path>
        </svg>
      </div>
      <p class="font-bold">{{ message }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MessageType } from './index'
export default defineComponent({
  props: {
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    },
    message: String
  },
  setup(props) {
    const classAry = [
      { 'bg-red-100 border-red-500 text-red-500': props.type === 'error' },
      { 'bg-teal-100 border-teal-500 text-teal-500': props.type === 'success' },
      {
        'bg-indigo-100 border-indigo-500 text-indigo-500':
          props.type === 'default'
      }
    ]
    return {
      classAry
    }
  }
})
</script>