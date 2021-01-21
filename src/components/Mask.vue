<template>
  <transition
      enter-active-class="transition ease-out duration-300"
      enter-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-300"
      leave-class="transform opacity-100"
      leave-to-class="transform opacity-0"
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