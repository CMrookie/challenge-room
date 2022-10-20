<template>
  <main
    class="bg-login-bg w-full h-full bg-no-repeat bg-center bg-cover flex items-center flex-col"
  >
    <h1
      id="logo"
      class="bg-logo h-1/3 bg-center bg-no-repeat bg-contain w-3/5 mt-24"
    ></h1>
    <form action="" class="w-3/5 mt-8 flex flex-col">
      <label for="accont" class="text-3xl font-extralight">帳號</label>
      <input
        id="accont"
        type="text"
        class="text-5xl p-5 border-2 border-solid border-black rounded-md"
      />
      <label for="password" class="text-3xl mt-7 font-extralight">密碼</label>
      <input
        id="password"
        type="password"
        class="text-5xl p-5 border-2 border-solid border-black rounded-md"
      />
    </form>
    <div
      class="border-black border-solid border-4 w-3/5 bg-btn p-5 text-5xl text-center mt-14 font-normal text-white rounded-md active:bg-btn-active select-none"
      @click="handleLogin"
    >
      登錄
    </div>
  </main>
</template>

<script lang="ts" setup>
const router = useRouter()

function handleLogin() {
  router.push({ path: '/scan' })
}
</script>
