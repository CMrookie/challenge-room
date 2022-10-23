<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <div class="content">
      <p>
        中國歷史挑戰室：
        <br />
        同學們認真觀看了我們探索室的影片後，這一刻就要給大家一個挑戰！
        <br />
        看誰能在最短時間答對最多的問題，當大家離開中心前，得分最高的五位可各獲得一份小禮品作為獎勵！
      </p>
      <div class="btn-scan" @click="handleScanClick">
        <i class="icon"></i>
        掃描二維碼開始答題
      </div>
    </div>
    <ChallengeQuit @quit="handleQuit"></ChallengeQuit>
    <footer class="footer">
      <div class="bg-btn border-r text-white active:bg-btn-active">
        <i class="icon bg-test-white"></i>
        答題
      </div>
      <div class="bg-white border-l active:bg-slate-200">
        <i class="icon bg-paper-black"></i>
        個人檔案
      </div>
    </footer>
  </main>
</template>

<script lang="ts" setup>
import { devLog } from '@/utils/devLog'
import ChallengeQuit from '../components/challengeQuit.vue'

const router = useRouter()

function handleScanClick() {
  router.push({ path: '/test' })
}

function handleQuit() {
  devLog(['quit'])
}
</script>

<style scoped>
.content {
  width: 60vw;
  padding-top: 35vw;
  p {
    @apply bg-white border-2 border-black rounded text-slate-600;
    padding: 2vw;
    font-size: 3vw;
  }
  .btn-scan {
    @apply bg-btn border-2 border-black rounded flex items-center justify-center text-white active:bg-btn-active;
    height: 12vw;
    margin-top: 10vw;
    font-size: 4vw;
    letter-spacing: 0.5vw;
    .icon {
      @apply bg-scan bg-no-repeat bg-cover;
      width: 6vw;
      height: 6vw;
      margin-right: 2vw;
    }
  }
}
.footer {
  @apply absolute bottom-0 flex w-full;
  div {
    @apply w-1/2 flex items-center justify-center border-t-2 border-black;
    padding-top: 3vw;
    padding-bottom: 3vw;
    font-size: 4vw;
    letter-spacing: 0.5vw;
    .icon {
      @apply inline-block bg-no-repeat bg-cover;
      width: 4vw;
      height: 5vw;
      margin-right: 3vw;
    }
  }
}
</style>
