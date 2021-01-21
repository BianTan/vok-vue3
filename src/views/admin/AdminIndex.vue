<template>
  <div class="flex" :class="switchSmall">
    <sidebar>
      <sidebar-item
        v-for="item in menuList"
        :key="item.id"
        :id="item.id"
        :url="item.url"
        :iconName="item.iconName">
        {{item.name}}
      </sidebar-item>
    </sidebar>
    <div class="flex-1 px-14 py-8">
      <app-header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { menuList } from '@/utlis/config'
import Sidebar from '@/components/admin/sidebar/Sidebar.vue'
import SidebarItem from '@/components/admin/sidebar/SidebarItem.vue'
import AppHeader from '@/components/admin/AppHeader.vue'

export default defineComponent({
  components: {
    Sidebar,
    AppHeader,
    SidebarItem
  },
  setup() {
    const store = useStore()
    const adminScreenSmall = computed(() => store.state.adminScreenSmall)
    const switchSmall = computed(() => {
      if(adminScreenSmall.value) return 'container mx-auto'
      return ''
    })
    return {
      menuList,
      switchSmall
    }
  }
})
</script>
