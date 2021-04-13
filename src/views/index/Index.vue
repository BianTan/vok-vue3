<template>
  <app-header />
  <div
    class="flex flex-col container mx-auto mt-28 sm:mt-32 px-3 lg:flex-row sm:px-0"
  >
    <aside class="hidden sm:block w-full mb-10 lg:w-80 lg:mb-0 flex-shrink-0">
      <sidebar
        class="relative sm:sticky top-24 left-0"
        :isPost="isPost"
        :switch-item="switchItem"
        @clickItemIndex="clickItemIndex"
      >
        <template #content>
          <div
            class="flex flex-col items-center pt-4"
            v-show="currentIndex === 0"
          >
            <img
              src="@/assets/img/ava.jpg"
              alt="logo"
              class="rounded-full w-32 h-32 shadow hover:shadow-lg cursor-pointer transition eaase-in-out duration-200"
            />
            <p class="text-lg font-bold mt-1">BianDan</p>
          </div>
          <div class="pt-4" v-show="currentIndex === 1">
            <h1>不是吧</h1>
          </div>
        </template>
      </sidebar>
    </aside>
    <router-view class="flex-1 mb-12 lg:pl-10" :key="$route.fullPath" />
  </div>
  <sidebar-menu />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/index/AppHeader.vue'
import Sidebar from '@/components/index/sidebar/Sidebar.vue'
import SidebarMenu from '@/components/index/SidebarMenu.vue'

export default defineComponent({
  components: {
    AppHeader,
    Sidebar,
    SidebarMenu
  },
  setup() {
    const route = useRoute()
    const indexData = reactive({
      currentIndex: 0, // 控制当前显示哪个侧边栏选项卡 （站点信息？文章目录？）
      isPost: computed(() => {
        // 返回当前是否是文章页面
        return route.meta.isPost
      }),
      switchItem: ['站点信息', '文章目录'], // 选项卡标题 ...
      clickItemIndex: (index: number) => {
        // 获取当前点击的选项卡的 index
        indexData.currentIndex = index
      }
    })
    onMounted(() => {
      if (indexData.isPost) {
        // 如果当前是文章页面
        indexData.currentIndex = 1 // 显示 文章目录 选项卡
      } else {
        // 否则
        indexData.currentIndex = 0 // 显示 站点信息 选项卡
      }
    })
    return {
      ...toRefs(indexData)
    }
  }
})
</script>
