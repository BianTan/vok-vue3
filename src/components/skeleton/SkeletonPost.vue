<template>
  <card class="overflow-hidden px-8 md:px-12 py-6 md:py-8">
    <div class="animate-pulse">
      <div class="flex mb-12">
        <skeleton-card class="h-11 w-12 rounded-full mr-4" />
        <div class="flex flex-col justify-between w-full">
          <skeleton-card class="w-16" />
          <skeleton-card class="w-2/3" />
        </div>
      </div>
      <skeleton-card class="w-1/3 h-8 mb-8" />
      <skeleton-card class="w-5/6" />
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/index/Card.vue'
import SkeletonCard from './SkeletonCard.vue' 

export default defineComponent({
  components: {
    Card,
    SkeletonCard
  }
})
</script>
