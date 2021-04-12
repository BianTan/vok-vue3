<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          请登录你的账号
        </h2>
      </div>
      <validate-form @form-submit="handleSubmitClick" class="mt-8">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md space-y-2">
          <validate-input
            :rules="nameRules"
            placeholder="请输入账号"
            type="text"
            class="mb-1"
            v-model="name"
          >
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
              >账号</label
            >
          </validate-input>
          <validate-input
            :rules="passwordRules"
            placeholder="请输入密码"
            type="password"
            v-model="password"
          >
            <label
              class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-full-name"
              >密码</label
            >
          </validate-input>
        </div>

        <div class="flex items-center justify-end mt-3">
          <div class="text-sm">
            <router-link
              to="/"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              注册账号
            </router-link>
          </div>
        </div>

        <template #submit>
          <button
            type="submit"
            class="mt-8 transition ease-in-out duration-200 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            登录
          </button>
        </template>
      </validate-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { RulesProp } from '@/types'
import ValidateInput from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/VaildateForm.vue'
import { createMessage } from '@/common/message'

export default defineComponent({
  name: 'login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup() {
    const router = useRouter()
    const store = useStore()

    if (store.state.user.isLogin) router.push('/') // 如果已经登陆了就跳转

    const state = reactive({
      name: '',
      password: '',
      nameRules: [{ type: 'required', message: '账号不能为空' }] as RulesProp,
      passwordRules: [
        { type: 'required', message: '密码不能为空' }
      ] as RulesProp
    })

    const handleSubmitClick = (res: boolean) => {
      if (res) {
        createMessage('正在登录...')
        const payload = {
          name: state.name,
          password: state.password
        }
        store
          .dispatch('login', payload)
          .then(res => {
            if (res.token !== null) {
              createMessage('登录成功，三秒后进入后台...', 'success')
              setTimeout(() => {
                router.push('/vok-admin')
              }, 3000)
            }
          })
          .catch(err => {
            createMessage(`登录失败！${err.msg ? err.msg : ''}`, 'error')
          })
      }
    }
    return {
      ...toRefs(state),
      handleSubmitClick
    }
  }
})
</script>