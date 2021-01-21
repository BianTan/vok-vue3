<template>
  <div class="flex">
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
    <div class="flex-1">
      <app-header />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    return {
      menuList
    }
  }
})
</script>
