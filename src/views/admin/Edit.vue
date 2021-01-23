<template>
  <div>{{post_type}}</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const post_type = computed(() => route.query.post_type)

    return {
      post_type
    }
  }
})
</script>
