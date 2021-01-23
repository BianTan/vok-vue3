<template>
  <div id="checkbox">
    <label>
      <input type="checkbox" v-bind="$attrs" class="hidden">
      <div class="iconfont absolute inline-block top-1/2 w-4 h-4 cursor-pointer rounded bg-white border border-admin-blue-600 transform -translate-y-1/2"></div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  inheritAttrs: false
})
</script>

<style>
#checkbox input:checked + div::before {
  @apply text-xs absolute text-white;
  top: -16px;
  left: 1px;
  content: "\e606";
}
#checkbox input:checked + div::before {
  top: 0;
  left: 1px;
}
#checkbox input:checked + div {
  @apply bg-admin-blue-500;
}
</style>
