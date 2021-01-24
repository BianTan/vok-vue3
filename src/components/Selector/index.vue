<template>
  <div class="relative h-8 leading-8 px-3 inline-block">
    <search-input :value="inputValue" @input="input" @focus="focus" @blur="blur"/>
    <transition-default class="duration-75">
      <search-menu v-if="isShow" :data="data" @itemClick="handleItemClick"/>
    </transition-default>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, PropType } from 'vue'
import TransitionDefault from '../transition/TransitionDefault.vue'
import SearchInput from './input.vue'
import SearchMenu from './menu.vue'

interface DataProps {
  id: number;
  value: string;
  text: string;
}
export default defineComponent({
  components: {
    SearchInput,
    SearchMenu,
    TransitionDefault
  },
  props: {
    value: String,
    data: Array as PropType<DataProps[]>
  },
  emits: ['menuClick'],
  setup(props, { emit }) {
    const state = reactive({
      inputValue: '',
      isShow: false
    })
    const input = (value: string) => {
      state.inputValue = value
    }
    const focus = () => {
      state.isShow = true
    }
    const blur = () => {
      setTimeout(() => {
        state.isShow = false
      }, 50)
    }
    const handleItemClick = (res: any) => {
      state.inputValue = res[1]
      emit('menuClick', res)
    }
    onMounted(() => {
      if(props.data) {
        state.inputValue = props.data[0].text
      }
    })
    return {
      ...toRefs(state),
      input,
      focus,
      blur,
      handleItemClick
    }
  }
})
</script>
