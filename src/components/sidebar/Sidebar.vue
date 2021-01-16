<template>
  <div class="bg-white shadow overflow-hidden rounded py-10 px-6">
    <div class="text-lg">9月24日</div>
    <div class="flex mt-2 text-sm text-gray-400">
      <span>SEP.24</span>
      <span class="mx-5">农历八月初八</span>
      <span>星期四</span>
    </div>
    <div class="flex text-sm list-none mt-4 overflow-hidden rounded-t border-b border-gray-100">
      <slot name="switch"></slot>
    </div>
    <div class="m-3">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>
