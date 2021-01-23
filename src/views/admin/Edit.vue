<template>
  <div class="inline-block">
    <card class="py-4">
      <ul class="flex space-x-3">
        <admin-link :to="{name: 'adminEdit', query: { post_type }}">全部文章（14）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'publish' }}">已发布（12）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'draft' }}">草稿箱（2）</admin-link>
        <admin-link :to="{name: 'adminEdit', query: { post_type, post_status: 'trash' }}">回收站（0）</admin-link>
      </ul>
    </card>
  </div>
  <card class="mt-8">
    <table-list/>
  </card>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Card from '@/components/admin/Card.vue'
import AdminLink from '@/components/admin/AdminLink.vue'
import TableList from '@/components/admin/table/TableList.vue'

export default defineComponent({
  components: {
    Card,
    AdminLink,
    TableList
  },
  setup() {
    const route = useRoute()
    const post_type = computed(() => route.query.post_type)

    onMounted(() => {
      if(!post_type.value || post_type.value === 'post') {
        console.log('post')
      } else if(post_type.value === 'page') {
        console.log('page')
      }
    })
    return {
      post_type
    }
  }
})
</script>
