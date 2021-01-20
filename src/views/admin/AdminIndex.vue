<template>
  <div class="flex">
    <sidebar>
      <sidebar-item
        v-for="item in menuList"
        :key="item.id"
        :url="item.url"
        :className="item.className"
        class="hover:bg-admin-blue-50 hover:text-admin-blue-500"
        :class="itemClass(item.id)"
        @click="itemClick(item.id)">
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
import { defineComponent, toRefs, reactive } from 'vue'
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
    const active = reactive({
      currentId: 1,
      itemClass: (id: number) => {
        if(active.currentId === id) return 'bg-admin-blue-50 text-admin-blue-500'
        return 'text-gray-700'
      },
      itemClick: (id: number) => {
        active.currentId = id
      }
    })
    return {
      menuList,
      ...toRefs(active)
    }
  }
})
</script>
