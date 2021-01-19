<template>
  <div class="space-y-12">
    <card class="pb-8">
      <div class="px-12">
        这里是内容
      </div>
    </card>
  </div>
</template>

<script lang="ts">
import Card from '@/components/Card.vue'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: { Card },
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
