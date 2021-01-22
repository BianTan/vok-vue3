<template>
  <div class="px-3 md:px-0">
    <card class="w-full mt-8 p-8 md:pb-14">
      <h1 class="text-2xl">欢迎使用 VokBlog</h1>
      <div class="flex flex-col md:flex-row mt-3 md:mt-6 space-y-6 md:space-y-0">
        <home-item title="开始使用">
          <router-link class="text-white bg-admin-blue-500 inline-block py-4 px-8 rounded-md" to="/vok-admin">设置你的站点</router-link>
        </home-item>
        <home-item title="接下来" class="space-y-1">
          <admin-link class="block">编辑文章</admin-link>
          <admin-link class="block">添加页面</admin-link>
        </home-item>
        <home-item title="更多操作" class="space-y-1">
          <admin-link class="block">编辑菜单</admin-link>
          <admin-link class="block">打开/关闭评论</admin-link>
        </home-item>
      </div>
    </card>
  </div>
  <div class="flex flex-col flex-wrap md:flex-row mt-6 md:mt-10 md:-mx-3">
    <home-card title="概览">
      <li v-for="item in info" :key="item.iconName" class="flex items-center">
        <i :class="`text-2xl mr-6 iconfont icon-${item.iconName}`"/>
        <admin-link :to="item.url">{{item.total + item.description}}</admin-link>
      </li>
    </home-card>
    <home-card title="最近发布">
      <li v-for="item in postInfo" :key="item.createdAt" class="flex items-center justify-between">
        <admin-link :to="item.url" class="inline-block flex-1 truncate">{{item.title}}</admin-link>
        <p class="ml-4 truncate">{{useDayjs('MM月DD日 Ahh:mm', item.createdAt)}}</p>
      </li>
    </home-card>
    <home-card title="最近评论" class="space-y-2">
      <li class="flex items-center" v-for="item in commentInfo" :key="item._id">
        <img :src="item.author.avatar_url" :alt="item.author.name" class="h-10 w-10 rounded-full mr-4 border">
        <div class="flex-1 truncate">
          <p>
            {{`${item.author.name} 在《`}}
            <admin-link :to="item.commentPost.url">{{item.commentPost.title}}</admin-link>
            {{`》中回复：`}}
          </p>
          <p>{{item.commentPost.content}}</p>
        </div>
      </li>
    </home-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDayjs } from '@/utlis'
import Card from '@/components/admin/Card.vue'
import HomeItem from '@/components/admin/home/HomeItem.vue'
import AdminLink from '@/components/admin/AdminLink.vue'
import HomeCard from '@/components/admin/home/HomeCard.vue'

export default defineComponent({
  components: { Card, HomeItem, AdminLink, HomeCard },
  setup() {
    const info = [
      {
        total: 18,
        url: '/vok-admin',
        iconName: 'post',
        description: ' 篇文章'
      },
      {
        total: 4,
        url: '/vok-admin',
        iconName: 'page',
        description: ' 个页面'
      },
      {
        total: 236,
        url: '/vok-admin',
        iconName: 'comment-admin',
        description: ' 条评论'
      }
    ]
    const postInfo = [
      {
        title: 'Vue.js 学习笔记',
        url: '/vok-admin',
        createdAt: '2020-01-17T15:22:22.983Z'
      },
      {
        title: 'Vue.js 学习笔记',
        url: '/vok-admin',
        createdAt: '2020-01-17T15:22:22.983Z'
      },
      {
        title: 'Vue.js 学习笔记',
        url: '/vok-admin',
        createdAt: '2020-01-17T15:22:22.983Z'
      },
      {
        title: 'Vue.js 学习笔记',
        url: '/vok-admin',
        createdAt: '2020-01-17T15:22:22.983Z'
      }
    ]
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

    return {
      info,
      postInfo,
      commentInfo,
      useDayjs
    }
  }
})
</script>
