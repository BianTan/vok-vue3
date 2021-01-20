<template>
  <card class="overflow-hidden px-8 md:px-12 py-6 md:py-8">
    <h1 class="text-xl sm:text-2xl text-gray-600 font-bold">{{commentTitle}}</h1>
    <slot/>
  </card>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import Card from '@/components/index/Card.vue'

export default defineComponent({
  components: { Card },
  props: {
    commentCount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const commentTitle = computed(() => {
      const count = props.commentCount
      return `${count} Comments`
    })
    return {
      commentTitle
    }
  }
})
</script>
