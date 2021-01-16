<template>
  <app-header />
  <div class="flex container mx-auto mt-32">
    <div class="w-80 mr-12">
      <sidebar>
        <template #switch>
          <sidebar-item :isActivate="true">站点信息</sidebar-item>
          <sidebar-item>文章目录</sidebar-item>
        </template>
        <template #content>
          <div class="flex flex-col items-center pt-4">
            <img src="./assets/img/ava.jpg" alt="logo" class="rounded-full w-32 h-32 shadow hover:shadow-lg cursor-pointer transition eaase-in-out duration-200">
            <p class="text-lg font-bold mt-1">BianDan</p>
          </div>
        </template>
      </sidebar>
    </div>
    <router-view class="flex-1" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import SidebarItem from './components/sidebar/SidebarItem.vue'

export default defineComponent({
  components: {
    AppHeader,
    Sidebar,
    SidebarItem
  }
})
</script>
