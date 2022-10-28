<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <div class="container-wrap">
      <transition name="">
        <section class="container">
          <div class="time">{{ questionTime }}</div>
          <div class="progress">12/20</div>
          <div class="title">視頻答題</div>
          <div>
            <ChallengeQuestion
              :assert="isAssert"
              :answer="answerList[questionNum]"
              :user-answer="userAnswerList[questionNum]"
              :question="questionList[questionNum].title"
              :options="questionList[questionNum].options"
              @select="handleSelect"
            ></ChallengeQuestion>
          </div>
        </section>
      </transition>
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
import { Snackbar } from '@varlet/ui'
import { devLog } from '@/utils/devLog'
import { useAppStore } from '@/store/app'
import { useCountdown } from '@/utils/useCountdown'
import { useTesting } from '@/utils/useTesting'

/**
 * @params type 0 判断
 * @params type 1 单选
 * @params type 2 多选
 */
const store = useAppStore()
const questionNum = ref<number>(0)
const questionList = store.questionList
console.log('questionList from store : ', questionList)
const isAssert = ref<boolean>(false)
const answerList = store.answerList // toRef(store, 'answerList') //ref<number[][]>([])
const userAnswerList = store.userAnswerList // toRef(store, 'userAnswerList') //ref<number[][]>([])
const { singleSelect, mutipleSelect } = useTesting()
const { timer, timeCountdown, clearCountdown, questionTime, feebackTime } =
  useCountdown()

function questionCountdown() {
  questionTime.value--
  if (questionTime.value <= 0) {
    clearCountdown()
    feebackTime.value = 1
    nextTick(() => {
      timeCountdown(feebackCountdown)
      questionNum.value++
    })
  }
  // TODO
}

function feebackCountdown() {
  feebackTime.value--
  if (feebackTime.value <= 0) return clearCountdown()
  // TODO
}

async function initTest() {
  questionTime.value = 10
  clearCountdown()
  timeCountdown(questionCountdown)
}
onMounted(async () => {
  await initTest()
  console.log('questionList: ', store.questionList)
})

const router = useRouter()
// function handleNextClick() {
//   router.push({ path: '/archives' })
// }

// const a = ref('a')

function handleClick() {
  // a.value = 'b'
}

const userAnswer = ref<number[]>([])
userAnswer.value = [0, 0, 0, 0]
function handleSelect(index: number) {
  console.log('select: ', index)
  if (
    questionList[questionNum.value].type === 0 ||
    questionList[questionNum.value].type === 1
  ) {
    userAnswerList[questionNum.value] = singleSelect(
      userAnswerList[questionNum.value],
      index
    )
  }
  if (questionList[questionNum.value] === 2) {
    userAnswerList[questionNum.value] = mutipleSelect(
      userAnswerList[questionNum.value],
      index
    )
  }
  // userAnswer.value[index] = 1
  // isAssert.value = !isAssert.value
}

function checkAnswerIsSelect(questionNum: number): boolean {
  let selected: number[] = userAnswerList.value[questionNum].filter(
    (item: number) => item === 1
  )
  return selected.length >= 1
}
function handleNextClick() {
  console.log('useranswer: ', userAnswerList.value[questionNum.value])
  console.log('isselect: ', checkAnswerIsSelect(questionNum.value))
  if (checkAnswerIsSelect(questionNum.value)) {
    isAssert.value = true
  } else {
    return Snackbar.warning('請先完成當前題目再進行下一題。')
  }
}
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
