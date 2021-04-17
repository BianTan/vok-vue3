<template>
  <card>
    <h1>{{ type === '0' ? '分类' : '标签' }}</h1>
    <div class="flex flex-wrap flex-col md:flex-row md:space-x-3 mt-6">
      <div class="w-full md:w-56">
        <input
          type="text"
          class="bg-white rounded py-2 px-2 border mr-2 text-sm w-full focus:outline-none"
          :placeholder="`请输入${type === '0' ? '分类' : '标签'}名称`"
          v-model="content"
        />
        <button
          @click="handleBtnClick"
          class="text-white bg-admin-blue-500 inline-block py-2 px-6 text-sm rounded-md cursor-pointer mt-4 focus:outline-none"
        >
          {{ EditState === 0 ? '添加' : '保存' }}
        </button>
        <a
          href="javascript:;"
          class="text-admin-blue-500 text-sm ml-4"
          @click="closeChange"
          v-if="EditState === 1"
          >取消</a
        >
      </div>
      <term-table
        class="flex-1 mt-3 md:mt-0"
        v-if="data.length > 0"
        :data="data"
        :type="type"
        @edit="edit"
        @onDelete="handleDelete"
      />
    </div>
  </card>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { TermProps } from '@/types'
import { get, patch, post, onDelete } from '@/network'
import { createMessage } from '@/common/message'
import Card from '@/components/admin/Card.vue'
import TermTable from '@/components/admin/TermTable/index.vue'

export default defineComponent({
  components: {
    Card,
    TermTable
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      data: [] as TermProps[],
      EditState: 0,
      content: '',
      id: '',
      type: 'category'
    })

    const closeChange = () => {
      state.content = ''
      state.EditState = 0
      state.content = ''
      state.id = ''
    }
    /**
     * 更新项目信息
     */
    const saveChange = () => {
      if (state.content.trim() === '') return createMessage('内容不能为空')
      createMessage('更新中...')
      patch(`/term/${state.type}/${state.id}`, {
        name: state.content
      })
        .then((res: any) => {
          if (res.code === 200) {
            const { id } = res.data
            const idx = state.data.findIndex(item => {
              return item.id === id
            })
            state.data.splice(idx, 1, { id, name: state.content })
            closeChange()
            createMessage(res.msg, 'success')
          }
        })
        .catch((error: any) => {
          if (error.code === 404)
            createMessage('未修改或存在相同名称的项目', 'error')
        })
    }
    /**
     * 添加新项目
     */
    const addItem = async () => {
      if (state.content.trim() === '') return createMessage('内容不能为空')
      createMessage('添加中...')
      try {
        const res: any = await post(`/term/${state.type}`, {
          name: state.content.trim()
        })
        if (res.code === 200) {
          const { id, name } = res.data
          state.data.push({
            id,
            name
          })
          closeChange()
          createMessage(res.msg, 'success')
        }
      } catch (error) {
        if (error.code === 404)
          createMessage('未修改或存在相同名称的项目', 'error')
      }
    }

    const handleBtnClick = () => {
      if (state.EditState === 0) {
        addItem()
      } else {
        saveChange()
      }
    }
    const edit = (data: TermProps) => {
      const { id, name } = data
      state.EditState = 1
      state.content = name
      state.id = id
    }
    const handleDelete = async (data: TermProps) => {
      createMessage('删除中...')
      const { id } = data
      try {
        await onDelete(`/term/${state.type}/${id}`)
        const idx = state.data.findIndex(item => {
          return item.id === id
        })
        state.data.splice(idx, 1)
        closeChange()
        createMessage('删除成功', 'success')
      } catch (error) {
        if (error.code === 404) createMessage(`错误：${error.message}`, 'error')
      }
    }

    onMounted(async () => {
      props.type === '0' ? (state.type = 'category') : (state.type = 'tag')
      const res = await get(`/term/${state.type}?isAll=true`)
      if (res) state.data = res.data
    })

    return {
      ...toRefs(state),
      saveChange,
      closeChange,
      handleBtnClick,
      edit,
      handleDelete
    }
  }
})
</script>
