<template>
  <div class="flex-1">
    <h2 class="text-xl mb-4">{{title}}</h2>
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>
