<template>
  <header class="shadow-md fixed top-0 left-0 w-full bg-white z-50 h-18">
    <menu class="flex container mx-auto my-0 px-8 h-full items-center justify-between">
      <router-link to="/" class="font-bold">我是笨蛋小扁担</router-link>
      <nav class="hidden lg:inline-block">
        <router-link :to="item.url" v-for="item in menuList" :key="item.id" class="mx-3">{{item.title}}</router-link>
      </nav>
      <i class="iconfont icon-search text-2xl cursor-pointer" />
    </menu>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
  setup() {
    return {
      menuList
    }
  }
})
</script>
