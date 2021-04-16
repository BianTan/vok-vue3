<template>
  <card class="w-full p-8 md:pb-14">
    <h1 class="text-2xl">欢迎使用 VokBlog</h1>
    <div class="flex flex-col md:flex-row mt-3 md:mt-6 space-y-6 md:space-y-0">
      <home-item title="开始使用">
        <router-link
          class="text-white bg-admin-blue-500 inline-block py-4 px-8 rounded-md"
          to="/vok-admin/options"
          >设置你的站点</router-link
        >
      </home-item>
      <home-item title="接下来" class="space-y-1">
        <admin-link class="block" :to="{ name: 'adminEdit' }"
          >编辑文章</admin-link
        >
        <admin-link
          class="block"
          :to="{ name: 'adminEdit', query: { post_type: 'page' } }"
          >添加页面</admin-link
        >
      </home-item>
      <home-item title="更多操作" class="space-y-1">
        <admin-link class="block" :to="{ name: 'options' }"
          >编辑菜单</admin-link
        >
        <admin-link class="block" :to="{ name: 'options' }"
          >打开/关闭评论</admin-link
        >
      </home-item>
    </div>
  </card>
  <div class="flex flex-col flex-wrap md:flex-row mt-6 md:mt-10 md:-mx-3">
    <home-card title="概览">
      <li
        v-for="item in homeData.info"
        :key="item.iconName"
        class="flex items-center"
      >
        <i :class="`text-2xl mr-6 iconfont icon-${item.iconName}`" />
        <admin-link :to="item.url">{{
          item.total + item.description
        }}</admin-link>
      </li>
    </home-card>
    <home-card title="最近发布">
      <li
        v-for="item in homeData.postInfo"
        :key="item.createdAt"
        class="flex items-center justify-between"
      >
        <admin-link
          :to="`/post/${item.id}.html`"
          target="_blank"
          class="inline-block flex-1 truncate"
          >{{ item.title }}</admin-link
        >
        <p class="ml-4 truncate">
          {{ useDayzh('MM月DD日 a hh:mm', item.createdAt) }}
        </p>
      </li>
    </home-card>
    <home-card title="最近评论" class="space-y-2" v-if="false">
      <li class="flex items-center" v-for="item in commentInfo" :key="item._id">
        <img
          :src="item.author.avatar_url"
          :alt="item.author.name"
          class="h-10 w-10 rounded-full border"
        />
        <div class="flex-1 pl-4 overflow-hidden">
          <p class="truncate">
            {{ `${item.author.name} 在《` }}
            <admin-link :to="item.commentPost.url">{{
              item.commentPost.title
            }}</admin-link>
            {{ `》中回复：` }}
          </p>
          <p class="truncate">{{ item.commentPost.content }}</p>
        </div>
      </li>
    </home-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { useDayzh } from '@/utlis'
import { get } from '@/network'
import { HomeDataProps } from '@/types'
import Card from '@/components/admin/Card.vue'
import HomeItem from '@/components/admin/home/HomeItem.vue'
import AdminLink from '@/components/admin/AdminLink.vue'
import HomeCard from '@/components/admin/home/HomeCard.vue'

export default defineComponent({
  components: {
    Card,
    HomeItem,
    AdminLink,
    HomeCard
  },
  setup() {
    const state = reactive({
      homeData: {} as HomeDataProps
    })

    const commentInfo = [
      {
        _id: '1',
        commentPost: {
          title: 'Vue.js 学习笔记',
          content: '哇偶～～',
          url: '/vok-admin'
        },
        author: {
          name: 'BianDan',
          avatar_url: 'http://60.205.248.2/images/ava.jpg'
        }
      },
      {
        _id: '2',
        commentPost: {
          title: 'Vue.js 学习笔记',
          content: '哇偶～～',
          url: '/vok-admin'
        },
        author: {
          name: 'BianDan',
          avatar_url: 'http://60.205.248.2/images/ava.jpg'
        }
      },
      {
        _id: '3',
        commentPost: {
          title: 'Vue.js 学习笔记',
          content: '哇偶～～',
          url: '/vok-admin'
        },
        author: {
          name: 'BianDan',
          avatar_url: 'http://60.205.248.2/images/ava.jpg'
        }
      }
    ]

    onMounted(() => {
      get('/').then(res => {
        state.homeData = res.data
      })
    })

    return {
      ...toRefs(state),
      commentInfo,
      useDayzh
    }
  }
})
</script>
