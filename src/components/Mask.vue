<template>
  <transition
      enter-active-class="transform transition ease-out duration-300 opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transform transition ease-in duration-300"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
    <div class="fixed inset-0 w-screen h-screen bg-gray-600 bg-opacity-50 z-30 cursor-pointer" @click="handleMaskClick" v-show="isShow"></div>
  </transition>
</template>

<script lg="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  emits: ['maskClick'],
  setup(props, { emit }) {
    const handleMaskClick = () => emit('maskClick')
    return {
      handleMaskClick
    }
  }
})
</script>