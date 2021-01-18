<template>
  <li id="sidebar-item" :class="classList" class="flex-1 cursor-pointer text-center px-6 py-3 transition ease-in-out duration-300 hover:bg-gray-100 hover:text-blue-800"><slot/></li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    isActivate: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classList = computed(() => {
      if (props.isActivate) {
        return 'text-blue-800 border-b-2 border-blue-800'
      }
      return ''
    })
    return {
      classList
    }
  }
})
</script>
