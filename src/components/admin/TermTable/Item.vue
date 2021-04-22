<template>
  <tr class="group">
    <td class="px-5 py-3">
      <div class="flex items-start">
        <div class="h-full">
          <label>
            <input
              class="cursor-pointer outline-none h-4 w-4 hidden"
              :checked="data.checked"
              @change="handleCheckboxChange"
              type="checkbox"
            />
            <div
              class="relative cursor-pointer border-admin-blue-500 rounded iconfont"
            />
          </label>
        </div>
        <div class="ml-4">
          <a
            href="javascript:;"
            class="align-top text-sm font-medium text-admin-blue-600 cursor-default"
            >{{ data.name }}</a
          >
          <div
            class="text-sm text-admin-blue-500 space-x-2 opacity-0 group-hover:opacity-100 transition"
          >
            <a href="javascript:;" @click="handleEditBtnClik">编辑</a>
            <a
              href="javascript:;"
              @click="handleDeleteBtnClick"
              class="text-red-500"
              >删除</a
            >
            <a
              :href="`/${type === '0' ? 'category' : 'tag'}/${data.id}`"
              target="_block"
              >查看</a
            >
          </div>
        </div>
      </div>
    </td>
    <td class="hidden lg:table-cell px-5 py-3 align-top">
      <a href="#" class="text-sm text-admin-blue-600 align-top"
        >id: {{ data.id }}</a
      >
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, InputHTMLAttributes, PropType } from 'vue'
import { TermProps } from '@/types'

export default defineComponent({
  name: 'TermTableItem',
  props: {
    data: {
      type: Object as PropType<TermProps>,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  emit: ['handleCheckboxChange', 'edit', 'onDelete'],
  setup(props, { emit }) {
    const handleCheckboxChange = (e: InputEvent) => {
      emit('handleCheckboxChange', {
        id: (props.data as TermProps).id,
        checked: (e.target as InputHTMLAttributes).checked
      })
    }

    const handleEditBtnClik = () => {
      emit('edit', props.data)
    }
    const handleDeleteBtnClick = () => {
      emit('onDelete', props.data)
    }

    return {
      handleCheckboxChange,
      handleEditBtnClik,
      handleDeleteBtnClick
    }
  }
})
</script>
