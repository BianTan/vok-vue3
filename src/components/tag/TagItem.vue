<template>
  <router-link :to="`/tag/${url}`" class="bg-blue-800 text-white px-2 py-1 mx-2 text-xs rounded"><slot/></router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    url: String
  }
})
</script>
