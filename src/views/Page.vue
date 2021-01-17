<template>
  <div>{{path}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const path = route.path.slice(1)
    return {
      path
    }
  }
})
</script>
