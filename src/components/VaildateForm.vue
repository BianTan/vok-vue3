<template>
  <form>
    <slot name="default"></slot>
    <div @click.prevent="handleClickButton">
      <slot name="submit">
          <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit">
            提交
          </button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()

type ValidateFunc = () => boolean
export default defineComponent({
  emits: ['form-submit'],
  setup (props, content) {
    let validateArr: ValidateFunc[] = []
    const handleClickButton = () => {
      const result = validateArr.map(func => func()).every(result => result)
      content.emit('form-submit', result)
    }
    const callback = (func?: ValidateFunc) => {
      if (func) {
        validateArr.push(func)
      }
    }
    emitter.on('ItemCreated', callback)
    onUnmounted(() => {
      emitter.off('ItemCreated', callback)
      validateArr = []
    })
    return {
      handleClickButton
    }
  }
})
</script>