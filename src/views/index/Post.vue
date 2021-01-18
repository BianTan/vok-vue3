<template>
  <div>Post ID: {{id}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'Post',
  setup() {
    const route = useRoute()
    const id = route.params.id
    return {
      id
    }
  }
})
</script>
