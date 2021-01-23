<template>
  <card class="py-10 px-6">
    <div class="text-lg">{{useDay('YYYY 年 MM 月 DD 日')}}</div>
    <div class="flex mt-2 text-sm text-gray-400 space-x-5">
      <span>{{useDay('MMM DD').toUpperCase()}}</span>
      <span>{{useDayzh('今天是dddd哟')}}</span>
    </div>
    <div v-if="isPost" class="flex text-sm list-none mt-4 overflow-hidden rounded-t border-b border-gray-100">
      <sidebar-item v-for="(item, index) in switchItem" :key="index" @click="switchClick(index)" :isActivate="index === currentIndex">{{item}}</sidebar-item>
    </div>
    <div class="m-3" :class="[{'border-t border-gray-100 mt-6 pt-3': !isPost}]">
      <slot name="content"></slot>
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useDay, useDayzh } from '@/utlis'
import SidebarItem from './SidebarItem.vue'
import Card from '@/components/index/Card.vue'

export default defineComponent({
  props: {
    isPost: {
      type: Boolean,
      default: false
    },
    switchItem: {
      type: Array,
      required: true
    }
  },
  emits: ['clickItemIndex'],
  components: {
    SidebarItem,
    Card
  },
  setup(props, { emit }) {
    const currentIndex = ref(1)
    watch(() => props.isPost, (e: boolean) => {
      if (e) {
        currentIndex.value = 1
      } else {
        currentIndex.value = 0
      }
      emit('clickItemIndex', currentIndex.value)
    })
    const switchClick = (index: number) => {
      currentIndex.value = index
      emit('clickItemIndex', currentIndex.value)
    }
    return {
      currentIndex,
      switchClick,
      useDay,
      useDayzh
    }
  }
})
</script>
