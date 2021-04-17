<template>
  <div class="space-y-4">
    <card class="space-y-4" v-if="adminPageSize.length > 0">
      <div class="flex items-center">
        <p>博客首页每页显示：</p>
        <input
          type="number"
          v-model="indexPageSize"
          class="bg-white rounded py-1 px-2 border mr-2 focus:outline-none"
        />
        篇文章
      </div>
      <div class="flex items-center">
        <p>博客后台每页显示：</p>
        <input
          type="number"
          v-model="adminPageSize"
          class="bg-white rounded py-1 px-2 border mr-2 focus:outline-none"
        />
        篇文章
      </div>
      <button
        @click="handleSaveBtnClick"
        class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer focus:outline-none"
      >
        保存
      </button>
    </card>
    <term type="0" />
    <term type="1" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { get, patch } from '@/network'
import { createMessage } from '@/common/message'
import Card from '@/components/admin/Card.vue'
import Term from '@/components/admin/Term.vue'

export default defineComponent({
  components: { Card, Term },
  setup() {
    const state = reactive({
      indexPageSize: '',
      adminPageSize: ''
    })

    const handleSaveBtnClick = async () => {
      if (state.indexPageSize === '' || state.adminPageSize === '')
        return createMessage('设置内容不能为空')
      if (
        parseInt(state.indexPageSize) <= 0 ||
        parseInt(state.adminPageSize) <= 0
      )
        return createMessage('设置内容必须大于0')
      const index = await patch('options', {
        type: 'indexPageSize',
        seq: state.indexPageSize
      })
      const admin = await patch('options', {
        type: 'adminPageSize',
        seq: state.adminPageSize
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
