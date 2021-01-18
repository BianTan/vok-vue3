<template>
  <div>Page Name: {{name}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const name = route.name
    return {
      name
    }
  }
})
</script>
