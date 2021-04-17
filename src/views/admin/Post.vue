<template>
  <div
    class="flex flex-col lg:flex-row"
    v-if="!!post.id && !!categories[0].value"
  >
    <div class="flex-1">
      <card class="inline-block rounded-md overflow-hidden mb-4 w-full">
        <input
          type="text"
          v-model="post.title"
          class="outline-none px-4 py-3 w-full"
          placeholder="请输入标题"
        />
      </card>
      <card class="rounded-md overflow-hidden edit-box">
        <editor
          :api-key="editApi"
          :init="editOption"
          outputFormat="html"
          v-model="post.content"
        />
      </card>
    </div>
    <div
      class="flex flex-wrap sticky top-0 w-full mt-3 lg:space-x-0 flex-col md:flex-row lg:flex-col lg:w-64 lg:ml-6 lg:mt-0 space-y-4 md:space-y-0 lg:space-y-4"
    >
      <edit-sidebar-box title="发布">
        <template v-slot:default>
          <div class="text-sm space-y-2">
            <p>
              状态：<span class="font-bold mr-2" v-if="!isEditStatus">{{
                getStatus(post.post_status)
              }}</span>
              <selector
                :data="postStatus"
                :currentId="
                  postStatus.find(f => f.value === post.post_status).id
                "
                @menuClick="handleEditStatusInputClick"
                v-if="isEditStatus"
              />
              <a
                @click="handleEditStatusBtnClick"
                href="javascript:;"
                class="text-sm text-admin-blue-600"
                >{{ isEditStatus ? '确定' : '编辑' }}</a
              >
            </p>
            <p>
              类型：<span class="font-bold mr-2" v-if="!isEditPostType">{{
                getPostType(post.type)
              }}</span>
              <selector
                :data="postType"
                :currentId="postType.find(f => f.id === post.type).value"
                v-if="isEditPostType"
                @menuClick="handleEditTypeInputClick"
              />
              <a
                href="javascript:;"
                class="text-sm text-admin-blue-600"
                @click="handleEditTypeBtnClick"
                >{{ isEditPostType ? '确定' : '编辑' }}</a
              >
            </p>
            <p>
              发布于：<span class="font-bold">{{
                useDay('YYYY 年 MM 月 DD 日', post.createdAt)
              }}</span>
            </p>
          </div>
        </template>
        <template v-slot:footer>
          <div class="flex justify-between items-center py-2 px-4 border-t">
            <a
              :href="`/post/${postId}.html`"
              target="_blank"
              class="text-sm text-admin-blue-600"
              >查看</a
            >
            <button
              @click="debounceUpdate"
              class="text-sm bg-admin-blue-500 text-white py-1 px-4 rounded focus:outline-none"
            >
              更新
            </button>
          </div>
        </template>
      </edit-sidebar-box>
      <edit-sidebar-box title="分类">
        <div class="space-y-2">
          <label
            class="flex items-center select-none"
            v-for="item in categories"
            :key="item.id"
          >
            <input
              class="cursor-pointer outline-none h-4 w-4 hidden"
              type="radio"
              name="category"
              :value="item.value"
              :checked="item.value === post.category.id"
              @change="handleCategoryChange(item)"
            />
            <div
              class="relative cursor-pointer border-admin-blue-500 rounded iconfont"
            />
            <p class="ml-2 cursor-pointer flex-1 text-sm">{{ item.text }}</p>
          </label>
        </div>
      </edit-sidebar-box>
      <edit-sidebar-box title="标签">
        <div class="flex mb-4">
          <input
            type="text"
            placeholder="多个标签请用英文逗号（,）分开"
            class="text-sm px-2 py-1 outline-none border rounded"
            v-model="addTagInputContent"
            @keyup="debounceAddTag"
          />
          <button
            @click="debounceAddTag"
            class="text-sm focus:outline-none bg-admin-blue-500 text-white rounded ml-2 px-2"
          >
            添加
          </button>
        </div>

        <div class="flex flex-wrap space-x-2">
          <div class="flex items-center" v-for="tag in post.tags" :key="tag.id">
            <i
              @click="handleDeleteTagBtnClick(tag.id)"
              class="icon-close leading-4 h-4 w-4 iconfont text-base cursor-pointer bg-admin-blue-500 text-white rounded-full"
            ></i>
            <p class="text-sm ml-1 cursor-default">{{ tag.name }}</p>
          </div>
        </div>
      </edit-sidebar-box>
      <edit-sidebar-box title="特色图片">
        <img
          v-if="post.post_url"
          :src="post.post_url"
          @click="handleCoverClick(true)"
          class="cursor-pointer mb-3 border rounded w-full"
        />
        <a
          href="javascript:;"
          @click="handleCoverClick(false)"
          class="text-sm text-admin-blue-600"
          >{{ post.post_url ? '取消特色图片' : '上传特色图片' }}</a
        >
      </edit-sidebar-box>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { PostListProps, OptionsProps } from '@/types'
import { editApi } from '@/config'
import { get, patch, post } from '@/network'
import { postStatus, postType } from '@/utlis/config'
import { useDay, getStatus, getPostType, debounce } from '@/utlis'
import { createMessage } from '@/common/message'
import Editor from '@tinymce/tinymce-vue'
import Card from '@/components/index/Card.vue'
import EditSidebarBox from '@/components/admin/EditSidebarBox/index.vue'
import Selector from '@/components/Selector/index.vue'

export default defineComponent({
  name: 'AdminPost',
  components: {
    Editor,
    Card,
    EditSidebarBox,
    Selector
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const state = reactive({
      post: {} as PostListProps,
      editOption: {
        min_height: 640,
        menubar: true,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount',
          'emoticons'
        ],
        toolbar:
          'undo redo emoticons | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
        language: 'zh_CN',
        toolbar_sticky: true,
        typeahead_urls: true,
        remove_trailing_brs: true,
        content_css: 'default', // dark document writer
        body_class: 'overflow-auto'
      },
      categories: computed<OptionsProps[]>(
        () => store.getters['admin/getCategoryList']
      ),
      postId: '',
      addTagInputContent: '',
      isEditStatus: false,
      EditStatus: '',
      isEditPostType: false,
      EditType: 0
    })

    /**
     * 更改文章状态 按钮点击
     */
    const handleEditStatusBtnClick = () => {
      if (state.isEditStatus) state.post.post_status = state.EditStatus
      state.isEditStatus = !state.isEditStatus
    }
    /**
     * 文章状态选择框 点击
     */
    const handleEditStatusInputClick = (res: string[]) => {
      state.EditStatus = res[0]
    }
    /**
     * 更改文章类型 按钮点击
     */
    const handleEditTypeBtnClick = () => {
      if (state.isEditPostType) state.post.type = state.EditType
      state.isEditPostType = !state.isEditPostType
    }
    /**
     * 文章类型选择框 点击
     */
    const handleEditTypeInputClick = (res: string[]) => {
      console.log(res)
      state.EditType = parseInt(res[0])
    }
    /**
     * 更新文章按钮 点击
     */
    const handleUpdateBtnClick = () => {
      const {
        title,
        content,
        type,
        post_url = '',
        category,
        tags,
        post_status
      } = state.post
      const cTags = tags.map(tag => {
        return tag.id
      })
      const data = {
        title,
        content,
        type,
        category: category.id,
        tags: cTags,
        post_url,
        post_status
      }
      patch(`/post/${state.postId}`, data)
        .then((res: any) => {
          if (res.code === 200) createMessage(res.msg, 'success')
        })
        .catch(error => {
          createMessage(
            `更新失败：${error.msg ? error.msg : error.message}`,
            'error'
          )
        })
    }
    const debounceUpdate = debounce(handleUpdateBtnClick, 500, true)
    /**
     * 分类单选框 改变
     */
    const handleCategoryChange = (category: OptionsProps) => {
      state.post.category = {
        id: category.value,
        name: category.text
      }
    }
    /**
     * 添加标签
     */
    const addTag = (args: any) => {
      const e: KeyboardEvent | MouseEvent = args[0]
      if (
        ((e as KeyboardEvent).code === 'Enter' || // input 回车
          (e as MouseEvent).type === 'click') && // 按钮点击
        state.addTagInputContent.trim() !== '' // 并且内容不为空
      ) {
        const tags = state.addTagInputContent.split(',').filter(f => f)
        tags.forEach(tag => {
          post('/term/tag', { name: tag })
            .then((res: any) => {
              const { id, name } = res.data
              if (res.code === 200) {
                const hasTag = state.post.tags.filter(tag => {
                  return tag.id === id
                })
                if (hasTag.length > 0) {
                  createMessage('不要重复添加')
                } else if (hasTag.length === 0) {
                  state.post.tags.push({
                    id,
                    name
                  })
                }
              } else if (res.code === 200) {
                state.post.tags.push({
                  id,
                  name
                })
              }
              state.addTagInputContent = ''
            })
            .catch(error => {
              if (error.code === 404) createMessage('标签添加失败', 'error')
            })
        })
      }
    }
    const debounceAddTag = debounce(addTag, 500, true)
    /**
     * 删除标签 点击
     */
    const handleDeleteTagBtnClick = (id: string) => {
      state.post.tags = state.post.tags.filter(tag => {
        return tag.id !== id
      })
    }
    /**
     * 封面上传点击
     */
    const handleCoverClick = (isCover: boolean) => {
      if (state.post.post_url.trim() != '' && !isCover) {
        state.post.post_url = ''
      } else {
        console.log('上传图片')
      }
    }

    onMounted(() => {
      route.query.id
        ? (state.postId = route.query.id.toString())
        : router.push('/vok-admin')
      store.dispatch('admin/getCategoryList') // 请求分类数据
      get(`/post/admin/${state.postId}`)
        .then(res => {
          state.post = res.data[0]
          state.EditStatus = state.post.post_status
        })
        .catch(err => createMessage(err.msg, 'error'))
    })

    return {
      ...toRefs(state),
      postStatus,
      postType,
      editApi,
      getStatus,
      getPostType,
      useDay,
      handleEditStatusBtnClick,
      handleEditStatusInputClick,
      handleEditTypeBtnClick,
      handleEditTypeInputClick,
      debounceUpdate,
      debounceAddTag,
      handleDeleteTagBtnClick,
      handleCategoryChange,
      handleCoverClick,
      debounce
    }
  }
})
</script>

<style>
.edit-box > .tox-tinymce {
  @apply border-none;
}
</style>
