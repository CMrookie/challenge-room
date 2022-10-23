<template>
  <LoadProgress v-if="!isLoaded" @load="handleLoad"></LoadProgress>
  <main
    v-if="isLoaded"
    class="bg-login-bg w-full h-full bg-no-repeat bg-center bg-cover flex items-center flex-col bg-main-bg"
  >
    <h1 id="logo" class="logo"></h1>
    <form action="" class="login-content">
      <label for="accont" class="text-3xl font-extralight">帳號</label>
      <input id="accont" type="text" class="login-input" />
      <label for="password" class="text-3xl mt-7 font-extralight">密碼</label>
      <input id="password" type="password" class="login-input" />
    </form>
    <div class="login-btn" @click="handleLogin">登錄</div>
  </main>
</template>

<script lang="ts" setup>
import LoadProgress from '../components/loadProgress.vue'
import { useLoaded } from '../utils/useLoad'

const { isLoaded, handleLoad } = useLoaded()
const router = useRouter()

function handleLogin() {
  router.push({ path: '/scan' })
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
.login-input {
  @apply p-4 border-2 border-solid border-black rounded-md;
  font-size: 4vw;
}
.login-btn {
  @apply border-black border-solid border-4 bg-btn text-center
   mt-14 font-normal text-white rounded-md active:bg-btn-active select-none;
  width: 60vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
  font-size: 5vw;
  letter-spacing: 0.5vw;
}
</style>
