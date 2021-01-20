<template>
  <li class="relative h-14 items-center transition ease-in-out duration-300">
    <router-link :to="url" class="flex text-xl pl-14 items-center h-full"><i :class="`text-3xl iconfont icon-${className} mr-4`"/><slot/></router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '/'
    },
    className: {
      type: String,
      required: true
    }
  }
})
</script>
