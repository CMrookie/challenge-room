<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <!-- <ChallengeQRScan :definition="true"></ChallengeQRScan> -->
    <div class="content">
      <qrcode-drop-zone v-if="isScan" @decode="onDecode">
        <qrcode-stream camera="rear" @decode="onDecode" />
      </qrcode-drop-zone>
      <p v-if="!isScan">
        中國歷史挑戰室：
        <br />
        <span>
          同學們認真觀看了我們探索室的影片後，這一刻就要給大家一個挑戰！
        </span>
        <span>
          看誰能在最短時間答對最多的問題，當大家離開中心前，得分最高的五位可各獲得一份小禮品作為獎勵！🙂
        </span>
      </p>
      <div v-if="!isScan" class="btn-scan" @click="handleScanClick">
        <i class="icon"></i>
        掃描二維碼開始答題
      </div>
    </div>

    <ChallengeQuit @quit="handleQuit"></ChallengeQuit>
    <!-- <var-dialog
      title=""
      message-align="center"
      :dialog-style="{ width: '60vw' }"
    >
      <p
        class="text-center"
        style="height: 20vw; line-height: 20vw; font-size: 4vw"
      >
        就只是提醒一下
      </p>
    </var-dialog> -->
    <footer class="footer">
      <div class="bg-btn border-r text-white active:bg-btn-active">
        <i class="icon bg-test-white"></i>
        答題
      </div>
      <div class="bg-white border-l active:bg-slate-200" @click="toArchives">
        <i class="icon bg-paper-black"></i>
        個人檔案
      </div>
    </footer>
  </main>
</template>

<script lang="ts" setup>
import { devLog } from '@/utils/devLog'
import ChallengeQuit from '../components/challengeQuit.vue'
import { QrcodeStream, QrcodeDropZone } from 'qrcode-reader-vue3'
import { Dialog, Snackbar } from '@varlet/ui'
import { useAppStore } from '@/store/app'
import { useGetQuestion } from '@/utils/useGetQuestion'
import { useGenerateAnswer } from '@/utils/usegenerateanswer'
// import { getQuestions } from '@/api'

const router = useRouter()

const { saveQuestion2Store } = useGetQuestion()

const isScan = ref<boolean>(false)
function handleScanClick() {
  isScan.value = true
}

function handleQuit() {
  devLog(['quit'])
}

function toArchives() {
  router.push({ path: '/archives' })
}

const _error = ref()
async function onInit(promise: any) {
  try {
    devLog([await promise])
  } catch (error: any) {
    if (error.name === 'NotAllowedError') {
      _error.value = 'ERROR: you need to grant camera access permission'
    } else if (error.name === 'NotFoundError') {
      _error.value = 'ERROR: no camera on this device'
    } else if (error.name === 'NotSupportedError') {
      _error.value = 'ERROR: secure context required (HTTPS, localhost)'
    } else if (error.name === 'NotReadableError') {
      _error.value = 'ERROR: is the camera already in use?'
    } else if (error.name === 'OverconstrainedError') {
      _error.value = 'ERROR: installed cameras are not suitable'
    } else if (error.name === 'StreamApiNotSupportedError') {
      _error.value = 'ERROR: Stream API is not supported in this browser'
    } else if (error.name === 'InsecureContextError') {
      _error.value =
        'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
    } else {
      _error.value = `ERROR: Camera error (${error.name})`
    }
    Snackbar.warning({
      content:
        '此設備可能無法正常掃碼，如果無法正常掃碼請更換其他設備進行挑戰!!',
      duration: 1000
    })
  }
}

const store = useAppStore()
const { generateAnswerList, initUserAnswer } = useGenerateAnswer()
async function onDecode(code: string) {
  console.log(code, 'store: ', store.qrCode)
  store.qrCode = code
  let res = await saveQuestion2Store(code)
  if (res.msg) {
    isScan.value = false
    return Dialog({ message: '溫馨提示：你已作答完畢' })
  }
  store.answerList = generateAnswerList(store.questionList)
  store.userAnswerList = initUserAnswer(store.questionList)
  router.push({ path: '/test' })
}
</script>

<style scoped>
.content {
  width: 60vw;
  padding-top: 35vw;
  p {
    @apply rounded text-black;
    padding: 2vw;
    font-size: 3vw;
    background-color: #ffd770;
  }
  span {
    @apply text-black;
    display: block;
    text-indent: 2em;
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
