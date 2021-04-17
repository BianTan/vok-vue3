<template>
  <header
    class="shadow-md fixed top-0 left-0 w-full bg-white z-40 h-18"
    ref="mobileMenuRef"
  >
    <menu
      class="relative flex container mx-auto my-0 px-8 h-full items-center justify-between select-none"
    >
      <p class="font-bold select-none">我是笨蛋小扁担</p>
      <nav class="hidden lg:block space-x-6">
        <router-link :to="item.url" v-for="item in menuList" :key="item.id">{{
          item.title
        }}</router-link>
      </nav>
      <i
        class="iconfont icon-search text-2xl cursor-pointer hidden lg:block"
        @click="searchBoxIsShow = !searchBoxIsShow"
      />
      <i
        class="iconfont icon-menu text-2xl cursor-pointer block lg:hidden"
        @click="handleMenuClick"
      />
      <transition-default
        leave-active-class="transition ease-out duration-300 transform -translate-y-0"
        leave-class="opacity-100 -translate-y-0"
        leave-to-class="opacity-0 -translate-y-12"
      >
        <input
          type="text"
          @keydown="onSearch"
          v-show="searchBoxIsShow"
          v-model="search"
          placeholder="请输入搜索内容"
          class="absolute right-8 z-10 top-20 focus:outline-none px-4 py-2 shadow-md rounded-md w-64 hidden lg:inline-block h-12"
        />
      </transition-default>
    </menu>
    <transition-default>
      <menu
        class="lg:hidden bg-white fixed top-18 my-0 w-full z-50 shadow pl-0"
        v-show="isShow"
      >
        <nav class="flex flex-col my-3" @click="handleMenuClick">
          <router-link
            :to="item.url"
            v-for="item in menuList"
            :key="item.id"
            class="py-3 px-12"
            >{{ item.title }}</router-link
          >
        </nav>
        <div class="px-12 pb-3">
          <input
            type="text"
            v-model="search"
            placeholder="请输入搜索内容"
            @keydown="onSearch"
            class="py-2 px-3 focus:outline-none border rounded w-full"
          />
        </div>
      </menu>
    </transition-default>
  </header>
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, reactive, ref } from 'vue'
import useClickOutside from '@/utlis/useClickOutside'
import TransitionDefault from '../transition/TransitionDefault.vue'
import router from '@/router'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    TransitionDefault
  },
  setup() {
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

    const route = useRoute()
    const mobileMenuRef = ref<null | HTMLElement>(null) // 手机版面 Menu 的 refs
    const outsideIsClick = useClickOutside(mobileMenuRef) // 是否点击了手机版面 Menu 的外面

    const state = reactive({
      searchBoxIsShow: false,
      isShow: false, // 控制手机版面的 Menu 是否显示
      handleMenuClick: () => (state.isShow = !state.isShow), // 切换显示状态
      search: ''
    })

    const onSearch = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && state.search.trim() !== '') {
        router.push({ name: 'Search', query: { s: state.search } })
        state.search = ''
        state.isShow = state.searchBoxIsShow = false
      }
    }

    watch(
      [outsideIsClick, () => route.fullPath],
      (newValue: any, oldValue: any) => {
        if (newValue[0] || (newValue[1] !== oldValue[1] && newValue[0]))
          state.isShow = state.searchBoxIsShow = false
      }
    )
    return {
      ...toRefs(state),
      menuList,
      mobileMenuRef,
      onSearch
    }
  }
})
</script>
