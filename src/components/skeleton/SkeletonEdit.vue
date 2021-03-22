<template>
  <card class="h-14 w-1/2">
    <skeleton-card class="h-full w-full"/>
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
