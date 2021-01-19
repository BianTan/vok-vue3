<template>
  <span class="flex space-x-1 items-center">
    <i class="iconfont text-gray-800" :class="`icon-${iconName}`" />
    <div class="flex space-x-2 text-sm"><slot/></div>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    iconName: {
      type: String,
      required: true
    }
  }
})
</script>
