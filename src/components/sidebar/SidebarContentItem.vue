<template>
  <div class="pt-4" v-if="isShow">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  }
})
</script>
