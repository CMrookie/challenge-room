<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <div class="container-wrap">
      <section class="container">
        <div class="time">60s</div>
        <div class="progress">12/20</div>
        <div class="title">視頻答題</div>
        <div>
          <ChallengeQuestion></ChallengeQuestion>
        </div>
      </section>
    </div>

    <footer class="footer">
      <div class="next-btn" @click="handleNextClick">下一題</div>
    </footer>
    <ChallengeMask v-if="false">
      <ChallengeScroeBoard></ChallengeScroeBoard>
    </ChallengeMask>
    <ChallengeMask v-if="false" @click="handleClick">
      <div class="text-white">
        <ChallengeFeeback :type="'cross'"></ChallengeFeeback>
      </div>
    </ChallengeMask>
  </main>
</template>

<script lang="ts" setup>
import ChallengeQuestion from '../components/challengeQuestion.vue'
import ChallengeMask from '../components/challengeMask.vue'
import ChallengeFeeback from '../components/challengeFeeback.vue'
import ChallengeScroeBoard from '../components/challengeScroeBoard.vue'
import { devLog } from '@/utils/devLog'

const router = useRouter()

function handleNextClick() {
  router.push({ path: '/archives' })
}

const a = ref('a')

function handleClick() {
  a.value = 'b'
}
const second = ref<number>(0)
const timer = ref<number>(null)
function countdown(fn: CallableFunction) {
  second.value--
  fn()
  function timeoutFn() {
    if (second.value > 0) {
      countdown(fn)
    }
  }
  timer.value = window.setTimeout(timeoutFn, 1000)
}

function countdownCb() {
  devLog([second.value])
  if (second.value < 3) {
    clearTimeout(timer.value)
  }
}
onMounted(() => {
  second.value = 10
  countdown(countdownCb)
  clearTimeout(timer.value)
})
</script>

<style scoped>
.container-wrap {
  @apply flex items-center;
  height: 86vh;
  padding-top: 4vh;
}
.container {
  @apply bg-white border-solid border-black border-2 relative rounded p-9;
  padding-top: 15vw;
  width: 90vw;
}
.time {
  @apply bg-time bg-no-repeat bg-cover text-center text-btn absolute font-semibold;
  width: 16vw;
  height: 9vw;
  top: -1.3vw;
  text-indent: -3vw;
  line-height: 9vw;
  font-size: 5vw;
}
.progress {
  @apply bg-progress bg-no-repeat bg-cover text-center text-white absolute;
  padding-top: 0.5vw;
  width: 10vw;
  height: 7vw;
  right: -1.7vw;
  top: 3vw;
  font-size: 3vw;
}
.title {
  @apply bg-title bg-no-repeat bg-cover text-btn absolute m-auto text-center;
  width: 35vw;
  height: 7vw;
  left: 0;
  right: 0;
  top: 3vw;
  line-height: 7vw;
  font-size: 4vw;
}
.footer {
  @apply absolute bottom-0 flex justify-center items-center;
  height: 14vh;
}
.next-btn {
  @apply bg-btn active:bg-btn-active border-2 border-solid border-black text-white rounded tracking-widest text-center;
  width: calc(100vw / 3);
  padding-top: 2vw;
  padding-bottom: 2vw;
  font-size: 4vw;
  letter-spacing: 0.5vw;
}
</style>
