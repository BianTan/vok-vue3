<template>
  <div
    class="bg-white text-gray-700 h-18 md:rounded-md shadow-admin flex items-center justify-end px-8 space-x-6 select-none w-full"
    id="admin-header"
  >
    <span class="hidden md:block">{{ now }}</span>
    <span class="flex items-center" v-if="user.isLogin"
      ><i class="iconfont icon-user text-2xl mr-4" />您好，{{ user.name }}</span
    >
    <span
      ><i
        class="iconfont icon-new text-2xl cursor-pointer"
        @click="$router.push('/vok-admin/new-post')"
    /></span>
    <span class="hidden lg:block"
      ><i
        :class="[{ 'icon-small': !screenSmall }, { 'icon-big': screenSmall }]"
        class="iconfont text-2xl cursor-pointer"
        @click="switchClick"
    /></span>
    <span class="block lg:hidden"
      ><i
        class="iconfont icon-menu text-2xl cursor-pointer"
        @click="handleMenuClick"
    /></span>
    <span class="hidden md:block"
      ><i
        class="iconfont icon-off text-2xl cursor-pointer text-red-500"
        @click="handleOffClick"
    /></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useDayzh } from '@/utlis'

export default defineComponent({
  emits: ['menuIconClick'],
  props: {
    user: {
      type: Object,
      require: true
    }
  },
  setup(props, { emit }) {
    const store = useStore()
    const now = computed(() => useDayzh('YYYY年M月DD日 dddd'))

    const screenSmall = computed(() => store.getters['admin/getScreenSmall']) // 获取状态
    const switchClick = () => {
      // 点击切换状态
      if (screenSmall.value) {
        localStorage.setItem('screenSmall', '0')
      } else {
        localStorage.setItem('screenSmall', '1')
      }
      store.commit('admin/setScreenSmall', !screenSmall.value) // 设置 state
    }

    const handleOffClick = () => {
      console.log('退出')
    }

    const handleMenuClick = () => emit('menuIconClick')

    return {
      now,
      switchClick,
      screenSmall,
      handleOffClick,
      handleMenuClick
    }
  }
})
</script>
