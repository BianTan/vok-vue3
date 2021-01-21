<template>
  <div class="bg-white text-gray-700 h-18 rounded-md shadow-admin flex items-center justify-end px-8 space-x-6" id="admin-header">
    <span>{{now}}</span>
    <span class="flex items-center"><i class="iconfont icon-user text-2xl mr-4"/>您好，BianDan</span>
    <span><i :class="[{'icon-small': !adminScreenSmall}, {'icon-big': adminScreenSmall}]" class="iconfont text-2xl cursor-pointer" @click="switchClick"/></span>
    <span><i class="iconfont icon-off text-2xl cursor-pointer text-red-500"/></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useDayjs } from '@/utlis'

export default defineComponent({
  setup() {
    const store = useStore()
    const now = computed(() => useDayjs('YYYY年M月DD日 星期d'))
    
    const adminScreenSmall = computed(() => store.state.adminScreenSmall) // 获取状态
    const switchClick = () => { // 点击切换状态
      if(adminScreenSmall.value) {
        localStorage.setItem('adminScreenSmall', '0')
      } else {
        localStorage.setItem('adminScreenSmall', '1')
      }
      store.commit('setAdminScreenSmall', !adminScreenSmall.value)  // 设置 state
    }
    return{
      now,
      switchClick,
      adminScreenSmall
    }
  }
})
</script>
