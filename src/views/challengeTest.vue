<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <div class="container-wrap">
      <transition name="fade">
        <section v-show="isTesting" class="container">
          <div class="time">{{ questionTime }}</div>
          <div class="progress">
            {{ questionNum + 1 }}/{{ questionList.length }}
          </div>
          <div class="title">
            {{ typeList[questionList[questionNum].type] }}
          </div>
          <div>
            <ChallengeQuestion
              :assert="isAssert"
              :answer="answerList[questionNum]"
              :user-answer="userAnswerList[questionNum]"
              :question="questionList[questionNum]?.title"
              :options="questionList[questionNum]?.options"
              @select="handleSelect"
            >
              <!-- <div class="w-full flex justify-center vidwo-wrap">
                <VideoPlayer
                  src="https://vjs.zencdn.net/v/oceans.mp4"
                  poster="https://vjs.zencdn.net/v/oceans.png"
                  controls
                  :loop="false"
                  :volume="0.6"
                  :width="videoWidth"
                ></VideoPlayer>
              </div> -->
            </ChallengeQuestion>
          </div>
        </section>
      </transition>
    </div>

    <footer v-show="isTesting" class="footer">
      <div class="next-btn" @click="handleNextClick">下一題</div>
    </footer>
    <transition name="fade">
      <ChallengeMask v-if="isFinish">
        <ChallengeScroeBoard
          :accuracy="accuracy"
          :designation="designation"
          :score="score"
          :stu-name="stuName"
          :test-time="testTime"
          :start-time="startTime"
          :end-time="endTime"
          :theme="theme"
        ></ChallengeScroeBoard>
      </ChallengeMask>
    </transition>
    <transition name="fade">
      <ChallengeMask v-show="isFeeback">
        <div class="text-white">
          <ChallengeFeeback :type="feebackType"></ChallengeFeeback>
        </div>
      </ChallengeMask>
    </transition>
  </main>
</template>

<script lang="ts" setup>
// import { VideoPlayer } from '@videojs-player/vue'
import 'video.js/dist/video-js.css'
import ChallengeQuestion from '../components/challengeQuestion.vue'
import ChallengeMask from '../components/challengeMask.vue'
import ChallengeFeeback from '../components/challengeFeeback.vue'
import ChallengeScroeBoard from '../components/challengeScroeBoard.vue'
import { Snackbar } from '@varlet/ui'
import { devLog } from '@/utils/devLog'
import { useAppStore } from '@/store/app'
import { useCountdown } from '@/utils/useCountdown'
import { useTesting } from '@/utils/useTesting'
import { useScoreBoardInfo } from '@/utils/useScoreBoardInfo'
// import { useVideoProps } from '@/utils/useVideoProps'
import { getStudentsInfo, finishAnswer } from '@/api'

// const { videoWidth } = useVideoProps()
/**
 * @params type 0 判断
 * @params type 1 单选
 * @params type 2 多选
 */
const typeList = ['判斷題', '單選題', '多選題']
const isTesting = ref<boolean>(false)
const store = useAppStore()
const questionNum = ref<number>(0)
const isAssert = ref<boolean>(false)
const feebackType = ref<string>('')
const questionList = store.questionList ?? []
const answerList = store.answerList ?? [] // toRef(store, 'answerList') //ref<number[][]>([])
const userAnswerList = store.userAnswerList ?? [] // toRef(store, 'userAnswerList') //ref<number[][]>([])
const {
  score,
  designation,
  stuName,
  theme,
  testTime,
  accuracy,
  startTime,
  endTime
} = useScoreBoardInfo()
const {
  singleSelect,
  mutipleSelect,
  assertAnswer,
  calcScore,
  isFinish,
  isFeeback
} = useTesting()
const {
  // timer,
  timeCountdown,
  clearCountdown,
  questionTime,
  feebackTime,
  stayAnswerTime
} = useCountdown()
devLog(['questionList from store : ', questionList])

function questionCountdown() {
  questionTime.value--
  if (questionTime.value <= 0) {
    // time over reset userAnswer cross
    userAnswerList[questionNum.value] = userAnswerList[questionNum.value].map(
      (_item: number) => 0
    )
    nextQuestion()
  }
}

function feebackCountdown() {
  feebackTime.value--
  if (feebackTime.value <= 0) {
    clearCountdown()
    // finish test
    if (questionNum.value + 1 === questionList.length) {
      // TODO
      // show score board
      score.value = calcScore(questionList)
      clearCountdown()
      setUserAnswer2QuestionList()
      showScoreBoard()
      return
    }
    showFeeback()
  }
}

function stayAnswerCountdown() {
  stayAnswerTime.value--
  if (stayAnswerTime.value <= 0) {
    clearCountdown()
    stayAnswer()
  }
}

function stayAnswer() {
  toggleIsFeeback()
  toggleIsAssert()
  toggleIsTestion()
  isClickNextBtn.value = true
  setCountdownTime('feeback', 2)
  timeCountdown(feebackCountdown)
}

function showFeeback() {
  setUserAnswer2QuestionList()
  questionNum.value++
  toggleIsClickNextBtn()
  toggleIsTestion()
  toggleIsFeeback()
  setCountdownTime('question', questionList[questionNum.value].time)
  // nestQuestion
  timeCountdown(questionCountdown)
}

async function showScoreBoard() {
  clearCountdown()
  toggleIsFeeback()
  store.score = calcScore(questionList)
  // refer answer
  devLog(['提交答案：', getAnswerData()])
  await finishTest()
  isFinish.value = true
}

function nextQuestion() {
  clearCountdown()
  toggleIsClickNextBtn()
  toggleIsAssert()
  let answerAssert = assertAnswer(
    answerList[questionNum.value],
    userAnswerList[questionNum.value]
  )
  questionTime.value > 0
    ? answerAssert
      ? (feebackType.value = 'correct')
      : (feebackType.value = 'cross')
    : (feebackType.value = 'timeover')
  questionList[questionNum.value]['isCorrect'] = answerAssert

  nextTick(() => {
    // showFeeback()
    setCountdownTime('answer', 2)
    timeCountdown(stayAnswerCountdown)
  })
}
function setCountdownTime(type: string, time?: number) {
  switch (type) {
    case 'question':
      questionList[questionNum.value].time
        ? (questionTime.value = questionList[questionNum.value].time + 1)
        : (questionTime.value = time ?? 0)
      break
    case 'feeback':
      time ? (feebackTime.value = time + 1) : (feebackTime.value = 0)
      break
    case 'answer':
      time ? (stayAnswerTime.value = time + 1) : (stayAnswerTime.value = 0)
      break
  }
}
function setUserAnswer2QuestionList() {
  questionList[questionNum.value]['userAnswer'] =
    userAnswerList[questionNum.value]
}
function toggleIsAssert() {
  isAssert.value = !isAssert.value
}
function toggleIsFeeback() {
  isFeeback.value = !isFeeback.value
}
function toggleIsTestion() {
  isTesting.value = !isTesting.value
}

function getAnswerData() {
  return {
    answers: questionList.map(
      (item: {
        id: any
        title: any
        options: any
        type: any
        isCorrect: any
        userAnswer: any
      }) => {
        const { id, title, options, type, isCorrect, userAnswer } = item
        return { id, title, options, type, isCorrect, userAnswer }
      }
    ),
    appid: store.questionsData.appid,
    total_grade: store.score
  }
}

async function finishTest() {
  try {
    let res = await finishAnswer(getAnswerData())
    devLog(['finish test: ', res])
  } catch (error: any) {}
}

async function initTest() {
  // questionTime.value = questionList[questionNum.value].time
  toggleIsTestion()
  setCountdownTime('question', questionList[questionNum.value].time)
  clearCountdown()
  timeCountdown(questionCountdown)
}
onMounted(async () => {
  await initTest()
  devLog(['questionList: ', store.questionList])
  try {
    let res: any = await getStudentsInfo()
    if (res.code === 200) {
      devLog(['getStudentInfo: ', res])
      stuName.value = res.data.username
      // theme.value = res.data.school
    } else {
      Snackbar.error(res.msg)
    }
  } catch (error: any) {
    Snackbar.error(error)
  }
})

// event handler
function handleSelect(index: number) {
  if (isClickNextBtn.value) return
  if (
    questionList[questionNum.value].type === 0 ||
    questionList[questionNum.value].type === 1
  ) {
    userAnswerList[questionNum.value] = singleSelect(
      userAnswerList[questionNum.value],
      index
    )
  }
  if (questionList[questionNum.value].type === 2) {
    userAnswerList[questionNum.value] = mutipleSelect(
      userAnswerList[questionNum.value],
      index
    )
  }
}

function checkAnswerIsSelect(questionNum: number): boolean {
  let selected: number[] = userAnswerList[questionNum].filter(
    (item: number) => item === 1
  )
  return selected.length >= 1
}
const isClickNextBtn = ref<boolean>(false)
function toggleIsClickNextBtn() {
  isClickNextBtn.value = !isClickNextBtn.value
}
function handleNextClick() {
  if (isClickNextBtn.value) return
  if (checkAnswerIsSelect(questionNum.value)) {
    nextQuestion()
  } else {
    return Snackbar.warning('溫馨提示：必須選擇答案!')
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
.vidwo-wrap {
  padding-top: 2vw;
}
</style>

<style>
.video-js .vjs-big-play-button {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
</style>
