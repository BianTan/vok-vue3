<template>
  <div class="w-full md:w-1/2 lg:w-full">
    <card class="md:mx-3 md:my-3 lg:m-0">
      <div class="px-4 py-2 text-sm border-b font-bold text-gray-700">
        {{ title }}
      </div>
      <div class="px-4 py-6"><slot /></div>
      <slot name="footer" />
    </card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from '@/components/index/Card.vue'

export default defineComponent({
  name: 'EditSidebarBox',
  components: { Card },
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
})
</script>
