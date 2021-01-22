<template>
  <div class="flex mx-auto" :class="switchSmall">
    <sidebar class="top-0 left-0 transform fixed lg:translate-x-0 lg:relative" :class="[{'-translate-x-full ': !isMenuShow}]">
      <sidebar-item
        v-for="item in menuList"
        :key="item.id"
        :id="item.id"
        :url="item.url"
        :iconName="item.iconName"
        @click="handleItemClick">
        {{item.name}}
      </sidebar-item>
    </sidebar>
    <div class="flex-1 w-full px-0 md:px-14 py-0 md:py-8">
      <app-header @menuIconClick="handleMenuClick" />
      <div class="mb-12 mx-3 md:mx-0">
        <router-view/>
      </div>
    </div>
    <mask-shadow class="block lg:hidden" @maskClick="handleMaskClick" :isShow="isMenuShow"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { menuList } from '@/utlis/config'
import Sidebar from '@/components/admin/sidebar/Sidebar.vue'
import SidebarItem from '@/components/admin/sidebar/SidebarItem.vue'
import AppHeader from '@/components/admin/AppHeader.vue'
import MaskShadow from '@/components/Mask.vue'

export default defineComponent({
  components: {
    Sidebar,
    AppHeader,
    SidebarItem,
    MaskShadow
  },
  setup() {
    const store = useStore()
    const adminScreenSmall = computed(() => store.state.adminScreenSmall)
    const switchSmall = computed(() => {
      if(adminScreenSmall.value) return 'xl:container'
      return ''
    })

    const isMenuShow = ref(false)
    const handleMenuClick = () => isMenuShow.value = !isMenuShow.value
    const handleMaskClick = () => isMenuShow.value = false
    const handleItemClick = () => setTimeout(() => isMenuShow.value = false, 300)
    return {
      menuList,
      switchSmall,
      isMenuShow,
      handleMenuClick,
      handleMaskClick,
      handleItemClick
    }
  }
})
</script>
