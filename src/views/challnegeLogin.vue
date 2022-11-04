<template>
  <LoadProgress v-if="!isLoaded" @load="handleLoad"></LoadProgress>
  <main
    v-if="isLoaded"
    class="bg-login-bg w-full h-full bg-no-repeat bg-center bg-cover flex items-center flex-col bg-main-bg"
  >
    <h1 id="logo" class="logo"></h1>
    <form action="" class="login-content">
      <label for="accont" class="text-3xl font-extralight">
        帳號
        <i class="tip-text">{{ tipUsername }}</i>
      </label>
      <input
        id="accont"
        v-model="form.username"
        type="text"
        class="login-input"
        @blur="checkUsername"
      />
      <label for="password" class="text-3xl mt-7 font-extralight">
        密碼
        <i class="tip-text">{{ tipPassword }}</i>
      </label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        class="login-input"
        @blur="checkPassword"
        @keyup="passwordVal($event)"
      />
    </form>
    <div class="login-btn" @click="handleLogin">登錄</div>
  </main>
</template>

<script lang="ts" setup>
import LoadProgress from '../components/loadProgress.vue'
import { useLoaded } from '../utils/useLoad'
import { login } from '../api'
import { devLog } from '@/utils/devLog'
import { Snackbar } from '@varlet/ui'
import { useCountdown } from '@/utils/useCountdown'

const { isLoaded, handleLoad } = useLoaded()

const router = useRouter()
const tipUsername = ref<string>('')
const tipPassword = ref<string>('')
const isDebounce = ref<boolean>(false)
const debounceTime = ref<number>(1)

const { timeCountdown, clearCountdown } = useCountdown()
async function handleLogin() {
  if (isDebounce.value) return
  if (!checkForm()) return
  isDebounce.value = true
  debounceTime.value = 1
  try {
    let res: any = await login(form)
    devLog(['login res: ', res])
    if (res.code === 200) {
      localStorage.setItem('token', res.data.token)
      saveUser()
      return router.push({ path: '/scan' })
    }
    return Snackbar.warning(res.data.msg)
  } catch (err: any) {
    devLog([err])
    Snackbar.error(err)
  }
  timeCountdown(debounceLogin)
}
function debounceLogin() {
  if (debounceTime.value <= 0) {
    clearCountdown
    return (isDebounce.value = false)
  }
  debounceTime.value--
}

const form = reactive({
  username: '',
  password: ''
})
function checkUsername() {
  tipUsername.value = ''
  if (!form.username) tipUsername.value = '請輸入帳號'
  return form.username ? true : false
}
function checkPassword() {
  tipPassword.value = ''
  if (!form.password) tipPassword.value = '請輸入密碼'
  return form.password ? true : false
}
function checkForm() {
  let isUsername = checkUsername()
  let isPassword = checkPassword()
  return isUsername && isPassword ? true : false
}
function saveUser() {
  localStorage.setItem('form', JSON.stringify(form))
}
function getUser() {
  return JSON.parse(localStorage.getItem('form') ?? '{}')
}
function clearToken() {
  localStorage.removeItem('token')
}
onMounted(() => {
  let store = getUser()
  clearToken()
  form.password = store?.password ?? ''
  form.username = store?.username ?? ''
})

//键盘收起
function passwordVal(e: any) {
  let timer = null
  timer && clearInterval(timer)
  timer = setTimeout(() => {}, 500)
  let keycode = window.event ? e.keyCode : e.which
  if (keycode == 13) {
    e.preventDefault()
    e.target.blur() //使输入框失去焦点。收起软键盘
  }
}
</script>

<style scoped>
.logo {
  @apply bg-logo bg-center bg-no-repeat bg-contain mt-24;
  width: 60vw;
  height: 40vw;
}
.login-content {
  @apply mt-8 flex flex-col;
  width: 60vw;
}
.tip-text {
  @apply text-red-500;
  padding-left: 2vw;
  font-size: 3vw;
}
.login-input {
  @apply p-4 border-2 border-solid border-black rounded-md;
  font-size: 4vw;
}
.login-btn {
  @apply border-black border-solid border-2 bg-btn text-center
   mt-14 font-normal text-white rounded-md active:bg-btn-active select-none;
  width: 60vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
  font-size: 5vw;
  letter-spacing: 0.5vw;
}
</style>
