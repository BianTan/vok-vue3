<template>
  <card class="overflow-hidden px-8 md:px-12 py-6 md:py-8">
    <div class="animate-pulse">
      <div class="flex mb-12">
        <div class="h-11 w-12 rounded-full mr-4 bg-blue-400"></div>
        <div class="flex flex-col justify-between w-full">
          <span class="bg-blue-400 w-16 h-4"></span>
          <div class="bg-blue-400 w-2/3 h-4"></div>
        </div>
      </div>
      <h1 class="bg-blue-400 w-1/3 h-8 mb-8"></h1>
      <div class="bg-blue-400 w-5/6 h-4"></div>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/Card.vue'

export default defineComponent({
  components: { Card }
})
</script>
