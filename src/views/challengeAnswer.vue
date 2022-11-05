<template>
  <main class="w-full h-full bg-main-bg">
    <ul class="challenge-list w-full h-full">
      <div class="container-wrap">
        <dev class="btn-back" @click="back"></dev>
        <h2 class="header-title">我的答題</h2>
        <template v-if="!historyQuestionList.length && !isEmpty">
          <p class="congratulation-tip">恭喜你，你的答題全部正確!</p>
        </template>
        <template v-if="historyQuestionList.length && !isEmpty">
          <section
            v-for="(question, index) in historyQuestionList"
            :key="index"
            class="container"
          >
            <!-- <div class="time">60s</div> -->
            <div class="progress">
              {{ index + 1 + '/' + historyQuestionList.length }}
            </div>
            <div class="title">{{ typeList[question.type] }}</div>
            <div>
              <ChallengeQuestion
                :assert="true"
                :answer="defaultAnswer[index] ?? [0, 0, 0]"
                :user-answer="userAnswer[index] ?? [0, 0, 0]"
                :question="question.title"
                :options="question.options"
              ></ChallengeQuestion>
            </div>
            <!-- <div class="analysis-box">
              解析:
              <p class="text-x text-black">
                題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx
              </p>
            </div> -->
          </section>
        </template>
      </div>
    </ul>
  </main>
</template>

<script lang="ts" setup>
// import { useAppStore } from '@/store/app'
import ChallengeQuestion from '../components/challengeQuestion.vue'
import { useGenerateAnswer } from '@/utils/useGenerateAnswer'
import { getHistoryList } from '@/api'
import { Snackbar } from '@varlet/ui'
import { json } from 'stream/consumers'

// type Answer = (0 | 1)[][]
const typeList = ['判斷題', '單選題', '多選題']
const isEmpty = ref<boolean>(true)
const { generateAnswerList } = useGenerateAnswer()
const historyQuestionList = ref<any[]>([])
const userAnswer = computed(() => {
  return historyQuestionList.value
    .filter((item: any) => {
      return item.choose
    })
    .map((item) => item.choose)
})
const defaultAnswer = computed(() => {
  console.log(
    'generateAnswerList: ',
    historyQuestionList.value.filter((item: any) => item)
  )
  return generateAnswerList(
    historyQuestionList.value.filter((item: any) => item)
  )
})

async function getHistoryQuestion() {
  try {
    const res: any = await getHistoryList()
    if (res.code === 200) {
      isEmpty.value = false
      historyQuestionList.value = res.data.questions.filter((item: any) => {
        if (!item.correct) {
          item.options = JSON.parse(item.options)
          item.choose = JSON.parse(item.choose)
          return item
        }
      })
      console.log('historyQuestion: ', historyQuestionList.value)
    } else {
      Snackbar.warning(res.msg)
    }
  } catch (error: any) {
    Snackbar.error(error)
  }
}

onMounted(getHistoryQuestion)

const router = useRouter()
// go back -> archives
function back() {
  router.push({ path: '/archives' })
}
</script>

<style scoped>
.congratulation-tip {
  /* @apply  */
  font-size: 4vw;
}
.container-wrap {
  @apply flex items-center flex-col static;
  padding-top: 1vh;
}
.container {
  @apply bg-white border-solid border-black border-2 relative rounded p-9;
  padding-top: 15vw;
  width: 90vw;
  margin-bottom: 5vw;
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
.header-title {
  @apply text-xl font-semibold text-black;
  margin-bottom: 5vw;
  font-size: 4vw;
}
.analysis-box {
  @apply text-xl text-black box-border border-2 border-black rounded;
  font-size: 2.5vw;
  padding: 1vw;
}
.challenge-list {
  @apply overflow-auto scroll-smooth;
}
.challenge-list::-webkit-scrollbar {
  width: 0 !important;
  height: 0px !important;
}
.btn-back {
  @apply bg-back bg-cover bg-no-repeat relative;
  top: 3vw;
  right: 40vw;
  width: 10vw;
  height: 10vw;
}
</style>
