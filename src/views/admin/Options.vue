<template>
  <card class="space-y-4" v-if="adminPageSize.length > 0">
    <div class="flex items-center">
      <p>博客首页每页显示：</p>
      <input
        type="text"
        v-model="indexPageSize"
        class="bg-white rounded py-1 px-2 border mr-2"
      />
      篇文章
    </div>
    <div class="flex items-center">
      <p>博客后台每页显示：</p>
      <input
        type="text"
        v-model="adminPageSize"
        class="bg-white rounded py-1 px-2 border mr-2"
      />
      篇文章
    </div>
    <button
      @click="handleSaveBtnClick"
      class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer"
    >
      保存
    </button>
  </card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { get, patch } from '@/network'
import { createMessage } from '@/common/message'
import Card from '@/components/admin/Card.vue'

export default defineComponent({
  components: { Card },
  setup() {
    const state = reactive({
      indexPageSize: '',
      adminPageSize: ''
    })

    const handleSaveBtnClick = async () => {
      if (
        state.indexPageSize.trim() === '' ||
        state.adminPageSize.trim() === ''
      )
        return createMessage('设置内容不能为空', 'error')
      const index = await patch('options', {
        type: 'indexPageSize',
        seq: state.indexPageSize.trim()
      })
      const admin = await patch('options', {
        type: 'adminPageSize',
        seq: state.adminPageSize.trim()
      })
      if (index && admin) createMessage('保存成功', 'success')
    }

    onMounted(() => {
      get('/options')
        .then(res => {
          const { indexPageSize, adminPageSize } = res.data
          state.indexPageSize = indexPageSize.toString()
          state.adminPageSize = adminPageSize.toString()
        })
        .catch(error => {
          createMessage(
            `错误：${error.msg ? error.msg : error.message}`,
            'error'
          )
        })
    })

    return {
      ...toRefs(state),
      handleSaveBtnClick
    }
  }
})
</script>
