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
            >{{ data.title }}</a
          >
          <div
            class="text-sm text-admin-blue-500 space-x-2 opacity-0 group-hover:opacity-100 transition"
          >
            <router-link :to="`/vok-admin/post?id=${data.id}`"
              >编辑</router-link
            >
            <a href="javascript:;">移至回收站</a>
            <a :href="`/post/${data.id}.html`" target="_block">查看</a>
          </div>
        </div>
      </div>
    </td>
    <td class="hidden lg:table-cell px-5 py-3 align-top">
      <a href="#" class="text-sm text-admin-blue-600 align-top">{{
        data.category.name
      }}</a>
    </td>
    <td class="hidden lg:table-cell px-5 py-3 align-top">
      <div class="space-x-1" v-if="data.tags.length !== 0">
        <a
          v-for="tag in data.tags"
          :key="tag.id"
          href="#"
          class="align-top px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-admin-blue-100 text-admin-blue-600"
        >
          #{{ tag.name }}
        </a>
      </div>
    </td>
    <td class="hidden lg:table-cell p-3 text-sm text-gray-500 align-top">
      {{ data.comment_count }}
    </td>
    <td class="hidden lg:table-cell px-5 py-3 text-right text-sm align-top">
      <div class="ml-4">
        <p class="text-sm text-gray-900">{{ getStatus(data.post_status) }}</p>
        <div class="text-sm text-gray-500">
          {{ useDay('YYYY-MM-DD', data.createdAt) }}
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, InputHTMLAttributes, PropType } from 'vue'
import { PostListProps } from '@/types'
import { useDay } from '@/utlis'

export default defineComponent({
  name: 'EditTableItem',
  props: {
    data: {
      type: Object as PropType<PostListProps>,
      required: true
    }
  },
  emit: ['handleCheckboxChange'],
  setup(props, { emit }) {
    const getStatus = (value: string) => {
      let res = ''
      switch (value) {
        case 'publish':
          res = '已发布'
          break
        case 'draft':
          res = '草稿箱'
          break
        case 'trash':
          res = '回收站'
          break
      }
      return res
    }

    const handleCheckboxChange = (e: InputEvent) => {
      emit('handleCheckboxChange', {
        id: (props.data as PostListProps).id,
        checked: (e.target as InputHTMLAttributes).checked
      })
    }

    return {
      getStatus,
      handleCheckboxChange,
      useDay
    }
  }
})
</script>
