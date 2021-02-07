<template>
  <li class="relative h-14 items-center transition ease-in-out duration-300 hover:bg-admin-blue-50 hover:text-admin-blue-500" :class="itemClass">
    <router-link :to="url" class="flex text-xl pl-14 items-center h-full">
      <slot/>
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { emitter } from './Sidebar.vue'

export default defineComponent({
  props: {
    url: {
      type: String,
      default: '/'
    },
    id: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const activeIndex: any = inject('activeIndex') // 获取当前 activeIndex

    const active = computed(() => { // 判断是否 active
      return props.id === activeIndex.value // 当前 Item 的 Id 与获取的 activeIndex 是否相同
    })
    const itemClass = computed(() => {  // 设置不同状态下 item 的 class
      if(active.value) return 'bg-admin-blue-50 text-admin-blue-500'
      return 'text-gray-700'
    })

    onMounted(() => {
      let id = 1
      if(route.path == props.url || route.name === 'adminPost') {
        id = route.meta.index
        if (route.query.post_type === 'page' || route.query.page) id = 3
        emitter.emit('adminMenuChange', id)
      }
    })
    return {
      itemClass
    }
  }
})
</script>
