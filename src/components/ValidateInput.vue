<template>
  <div class="flex w-full flex-col relative">
    <p v-if="inputRef.error" class="text-red-500 text-sm text-right absolute top-0 right-0">{{inputRef.message}}</p>
    <div class="md:flex md:items-start mt-6">
      <div class="h-10 flex items-center">
        <slot></slot>
      </div>
      <div class="flex-1 flex flex-col items-end">
        <input
          v-if="tag !== 'textarea'"
          v-bind="$attrs"
          @blur="validateInput"
          @input="updateValue"
          :class="[{'border-gray-200': !inputRef.error && !isContent}, {'border-red-500': inputRef.error}, {'border-purple-500': !inputRef.error && isContent}]"
          class="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" v-model="inputRef.val" />
        <textarea
          v-if="tag === 'textarea'"
          v-bind="$attrs"
          @blur="validateInput"
          @input="updateValue"
          :class="[{'border-gray-200': !inputRef.error && !isContent}, {'border-red-500': inputRef.error}, {'border-purple-500': !inputRef.error && isContent}]"
          class="appearance-none border-2 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" v-model="inputRef.val">
        </textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RulesProp, TagType } from '@/types'
import { defineComponent, PropType, reactive, ref, onMounted } from 'vue'
import { emitter } from './VaildateForm.vue'

export default defineComponent({
  inheritAttrs: false,
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup (props, content) {
    const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const isContent = ref(false)
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      if (targetValue.trim() !== '') {
        isContent.value = true
      } else {
        isContent.value = false
      }
      inputRef.val = targetValue
      content.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rulesItem => {
          let passed = true
          inputRef.message = rulesItem.message
          switch (rulesItem.type) {
            case 'required':
              passed = (inputRef.val.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }
    onMounted(() => {
      emitter.emit('ItemCreated', validateInput)
    })
    return {
      inputRef,
      isContent,
      validateInput,
      updateValue
    }
  }
})
</script>