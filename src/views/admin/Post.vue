<template>
  <div class="flex"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { createMessage } from '@/common/message'
import { get } from '@/network'

export default defineComponent({
  name: 'AdminPost',
  setup() {
    const route = useRoute()
    const state = reactive({
      post: {}
    })

    onMounted(() => {
      get(`/post/admin/${route.query.id}`)
        .then(res => {
          state.post = res.data[0]
        })
        .catch(err => {
          createMessage(err.msg, 'error')
        })
    })
  }
})
</script>
