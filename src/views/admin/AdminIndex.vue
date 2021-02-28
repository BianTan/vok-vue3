<template>
  <div class="flex mx-auto" :class="switchSmall">
    <sidebar class="transform lg:translate-x-0 top-0 left-0 fixed lg:sticky" :class="[{'-translate-x-full ': !isMenuShow}]">
      <sidebar-item
        v-for="item in menuList"
        :key="item.id"
        :id="item.id"
        :url="item.url"
        @click="handleItemClick">
        <i :class="`text-3xl iconfont icon-${item.iconName} mr-4`"/>
        {{item.name}}
      </sidebar-item>
    </sidebar>
    <div class="flex-1 w-full px-0 md:px-14 py-0 md:py-8">
      <app-header @menuIconClick="handleMenuClick" :user="userData" class="mb-8" />
      <div class="mb-12 mx-3 md:mx-0">
        <router-view :key="$route.fullPath"/>
      </div>
    </div>
    <mask-shadow class="block lg:hidden" @maskClick="handleMaskClick" :isShow="isMenuShow"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { menuList } from '@/utlis/config'
import Sidebar from '@/components/admin/sidebar/Sidebar.vue'
import SidebarItem from '@/components/admin/sidebar/SidebarItem.vue'
import AppHeader from '@/components/admin/AppHeader.vue'
import MaskShadow from '@/components/Mask.vue'
import { emitter } from '@/components/admin/sidebar/Sidebar.vue'

export default defineComponent({
  components: {
    Sidebar,
    AppHeader,
    SidebarItem,
    MaskShadow
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const screenSmall = computed(() => store.getters['admin/getScreenSmall']) // 窗口状态
    const switchSmall = computed(() => {  // 窗口状态的 class
      if(screenSmall.value) return 'xl:container'  // 如果是缩小窗口，就添加 container
      return ''
    })
    const userData = computed(() => store.state.user)
    const index = computed(() => route.meta.index)
    watchEffect(() => {
      if (index.value) {
        let id = index.value
        if ((route.query.post_type && route.query.post_type === 'page') || (route.query.page && route.name === 'adminPost')) {
          id = 3
        }
        emitter.emit('adminMenuChange', id)
      }
    })

    const isMenuShow = ref(false) // 是否展示菜单
    const handleMenuClick = () => isMenuShow.value = !isMenuShow.value  // 菜单按钮点击
    const handleMaskClick = () => isMenuShow.value = false  // 点击 mask
    const handleItemClick = () => setTimeout(() => isMenuShow.value = false, 300) // 点击侧边栏菜单延迟 300 毫秒关闭
    return {
      menuList,
      switchSmall,
      userData,
      isMenuShow,
      handleMenuClick,
      handleMaskClick,
      handleItemClick
    }
  }
})
</script>
