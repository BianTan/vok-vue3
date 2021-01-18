<template>
  <div>
    <app-header />
    <div class="flex flex-col container mx-auto mt-32 px-6 lg:flex-row sm:px-0">
      <aside class="w-full mb-10 lg:mr-12 lg:w-80 lg:mb-0">
        <sidebar class="sticky top-32 left-0"
          :isPost="isPost"
          :switch-item="switchItem"
          @clickItemIndex="clickItemIndex">
          <template #content>
            <sidebar-content-item class="flex flex-col items-center" :isShow="currentIndex === 0">
              <img src="@/assets/img/ava.jpg" alt="logo" class="rounded-full w-32 h-32 shadow hover:shadow-lg cursor-pointer transition eaase-in-out duration-200">
              <p class="text-lg font-bold mt-1">BianDan</p>
            </sidebar-content-item>
            <sidebar-content-item :isShow="currentIndex === 1">
              <h1>不是吧</h1>
            </sidebar-content-item>
          </template>
        </sidebar>
      </aside>
      <router-view class="flex-1" :key="$route.fullPath" />
    </div>
    <sidebar-menu/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import SidebarContentItem from '@/components/sidebar/SidebarContentItem.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

export default defineComponent({
  components: {
    AppHeader,
    Sidebar,
    SidebarMenu,
    SidebarContentItem
  },
  setup() {
    const route = useRoute()
    const indexData = reactive({
      currentIndex: 0,
      isPost: computed(() => {
        return route.meta.isPost
      } ),
      switchItem: ['站点信息', '文章目录']
    })
    const clickItemIndex = (index: number) => {
      indexData.currentIndex = index
    }
    onMounted(() => {
      if(indexData.isPost) {
        indexData.currentIndex = 1
      } else {
        indexData.currentIndex = 0
      }
    })
    return {
      clickItemIndex,
      ...toRefs(indexData)
    }
  }
})
</script>
