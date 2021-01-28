<template>
  <li class="w-full lg:w-1/2 md:px-3 py-4" :class="baseClass" id="home-card">
    <card v-bind="$attrs" class="space-y-1">
      <h2 class="mb-4 text-lg">{{title}}</h2>
      <slot/>
    </card>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import Card from '@/components/admin/Card.vue'

export default defineComponent({
  components: { Card },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const store = useStore()
    const screenSmall = computed(() => store.getters['admin/getScreenSmall'])
    const baseClass = computed(() => {
      if(screenSmall.value) return ''
      return '2xl:w-1/3'
    })
    return {
      baseClass
    }
  }
})
</script>