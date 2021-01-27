<template>
  <article class="bg-white rounded overflow-hidden shadow pb-6">
    <skeleton-card class="w-full h-60 rounded-b-none" />
    <div class="pt-6 px-8">
      <skeleton-card class="w-1/3 h-6 sm:h-8 mb-3" />
      <skeleton-card class="w-full" />
      <skeleton-card class="w-1/3 mt-2" />
    </div>
  </article>
  <article class="flex">
    <skeleton-card class="h-16 w-16 rounded-full mr-4"/>
    <card class="flex-1 relative ml-10 px-7 py-5">
      <i class="iconfont icon-quote text-white bg-blue-800 w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -left-4"></i>
      <skeleton-card class="w-2/3" />
      <skeleton-card class="w-1/3 mt-2" />
    </card>
  </article>
  <article class="bg-white rounded overflow-hidden shadow py-6 px-8">
    <skeleton-card class="w-1/3 h-6 sm:h-8 mb-3" />
    <skeleton-card class="w-full" />
    <skeleton-card class="w-1/3 mt-2" />
  </article>
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
