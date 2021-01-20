<template>
  <header class="shadow-md fixed top-0 left-0 w-full bg-white z-40 h-18" ref="mobileMenuRef">
    <menu class="flex container mx-auto my-0 px-8 h-full items-center justify-between">
      <router-link to="/" class="font-bold">我是笨蛋小扁担</router-link>
      <nav class="hidden lg:block space-x-6">
        <router-link :to="item.url" v-for="item in menuList" :key="item.id">{{item.title}}</router-link>
      </nav>
      <i class="iconfont icon-search text-2xl cursor-pointer" @click="handleMenuClick" />
    </menu>
    <transition-default>
      <menu class="lg:hidden bg-white fixed top-18 my-0 w-full z-50 shadow pl-0" v-show="isShow">
        <nav class="flex flex-col my-3" @click="handleMenuClick">
          <router-link :to="item.url" v-for="item in menuList" :key="item.id" class="py-3 px-12">{{item.title}}</router-link>
        </nav>
      </menu>
    </transition-default>
  </header>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, reactive, ref } from 'vue'
import useClickOutside from '@/utlis/useClickOutside'
import TransitionDefault from '../transition/TransitionDefault.vue'
const menuList = [
  {
    id: 0,
    url: '/',
    title: 'Home'
  },
  {
    id: 1,
    url: '/about',
    title: 'About'
  },
  {
    id: 2,
    url: '/themes',
    title: 'Themes'
  },
  {
    id: 3,
    url: '/guestbook',
    title: 'GuestBook'
  },
  {
    id: 4,
    url: '/myfriends',
    title: 'MyFriends'
  }
]

export default defineComponent({
  components: {
    TransitionDefault
  },
  setup() {
    const mobileMenu = reactive({
      isShow: false,  // 控制手机版面的 Menu 是否显示
      handleMenuClick: () => {  // 切换显示状态
        mobileMenu.isShow = !mobileMenu.isShow
      }
    })
    const mobileMenuRef = ref<null | HTMLElement>(null) // 获取手机版面 Menu 的 DOM
    const outsideIsClick = useClickOutside(mobileMenuRef) // 是否点击了手机版面 Menu 的外面
    watch(outsideIsClick, () => { // 状态发生改变
      if (outsideIsClick && mobileMenu.isShow) {  // 如果点击了外面并且 Menu 打开了
        mobileMenu.isShow = outsideIsClick.value = false  // 关闭手机 Menu
      }
    })
    return {
      menuList,
      mobileMenuRef,
      ...toRefs(mobileMenu)
    }
  }
})
</script>
