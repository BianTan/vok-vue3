<template>
  <router-link class="text-admin-blue-500 transition-colors duration-300 ease-linear text-center" :to="to"><slot/></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    to: {
      type: [String, Object],
      default: '/vok-admin'
    }
  }
})
</script>
