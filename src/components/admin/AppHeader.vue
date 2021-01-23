<template>
  <div class="bg-white text-gray-700 h-18 md:rounded-md shadow-admin flex items-center justify-end px-8 space-x-6 select-none w-full" id="admin-header">
    <span class="hidden md:block">{{now}}</span>
    <span class="flex items-center"><i class="iconfont icon-user text-2xl mr-4"/>您好，BianDan</span>
    <span class="hidden lg:block"><i :class="[{'icon-small': !adminScreenSmall}, {'icon-big': adminScreenSmall}]" class="iconfont text-2xl cursor-pointer" @click="switchClick"/></span>
    <span class="block lg:hidden"><i class="iconfont icon-menu text-2xl cursor-pointer" @click="handleMenuClick"/></span>
    <span class="hidden md:block"><i class="iconfont icon-off text-2xl cursor-pointer text-red-500"/></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useDayzh } from '@/utlis'

export default defineComponent({
  emits: ['menuIconClick'],
  setup(props, { emit }) {
    const store = useStore()
    const now = computed(() => useDayzh('YYYY年M月DD日 dddd'))

    const adminScreenSmall = computed(() => store.state.adminScreenSmall) // 获取状态
    const switchClick = () => { // 点击切换状态
      if(adminScreenSmall.value) {
        localStorage.setItem('adminScreenSmall', '0')
      } else {
        localStorage.setItem('adminScreenSmall', '1')
      }
      store.commit('setAdminScreenSmall', !adminScreenSmall.value)  // 设置 state
    }

    const handleMenuClick = () => emit('menuIconClick')
    return{
      now,
      switchClick,
      adminScreenSmall,
      handleMenuClick
    }
  }
})
</script>
