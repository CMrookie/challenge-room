<template>
  <div class="score-board">
    <div class="score-board-title">本次挑戰成績</div>
    <div class="flex justify-center">
      <i v-for="i in star" :key="i" class="star"></i>
    </div>
    <div class="challenge-score-container">
      <span class="challenge-score">{{ score }} 分</span>
    </div>
    <div class="challenge-designations">{{ designation }}</div>
    <div class="challenge-detail">
      <div>
        <span>學生: {{ stuName }}</span>
        <span>主題: {{ theme }}</span>
      </div>
      <div>
        <span>用時: {{ testTime }}</span>
        <span>正確率: {{ accuracy }}</span>
      </div>
      <div>開始時間: {{ startTime }}</div>
      <div>結束時間: {{ endTime }}</div>
    </div>
    <div class="flex justify-center">
      <div class="btn-paper" @click="viewAnswer">正確答案</div>
      <div class="btn-comfirm" @click="handleComfirm">確定</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  score?: number
  designation?: string
  stuName?: string
  theme?: string
  testTime?: number | string
  accuracy?: string
  startTime?: string
  endTime?: string
}

const props = withDefaults(defineProps<Props>(), {
  score: 0,
  designation: '',
  stuName: '',
  theme: '',
  testTime: '',
  accuracy: '0',
  startTime: '',
  endTime: ''
})

const star = computed(() => {
  if (props.score < 60) return 1
  if (props.score < 80 && props.score >= 60) return 2
  if (props.score >= 80) return 3
  return 0
})

const router = useRouter()

function viewAnswer() {
  // is_Inquiry.value = true
  router.push({ path: '/Answer' })
}
function handleComfirm() {
  router.push({ path: '/archives' })
}
</script>

<style scoped>
.score-board {
  @apply border-2 border-black rounded bg-white relative;
  width: 90vw;
  padding: 13vw 3vw 3vw 3vw;
}
.score-board-title {
  @apply bg-card-title bg-no-repeat bg-cover absolute m-auto text-white text-center;
  top: -2.5vw;
  left: 0;
  right: 0;
  width: 66vw;
  height: 11.6vw;
  line-height: 11.6vw;
  letter-spacing: 1.5vw;
  font-size: 4vw;
}
.star {
  @apply bg-star bg-no-repeat bg-cover inline-block bg-center;
  width: 5vw;
  height: 5vw;
  &:not(:last-child) {
    margin-right: 5vw;
  }
}
.challenge-score-container {
  @apply bg-score-wrap bg-cover bg-no-repeat m-auto text-center relative;
  width: calc(90vw - (8vw * 2));
  height: 7.3vw;
  margin-top: 4vw;
  margin-bottom: 3vw;
  line-height: 7.3vw;
}
.challenge-score {
  @apply text-btn absolute m-auto left-0 right-0 top-0 bottom-0 font-semibold;
  font-size: 10vw;
}
.challenge-designations {
  @apply text-btn font-semibold text-center;
  font-size: 9vw;
}
.challenge-detail {
  @apply text-slate-600;
  margin: 4vw 0 3vw 0;
  font-size: 3.5vw;
  & > div {
    @apply flex justify-start;
    &:not(:last-child) {
      margin-bottom: 2.5vw;
    }
    span {
      @apply inline-block;
      width: calc(90vw - 6vw);
    }
  }
}
.btn-paper,
.btn-comfirm {
  @apply border-2 border-black rounded text-center;
  width: 30vw;
  padding: 2vw;
  font-size: 4vw;
  letter-spacing: 0.5vw;
}
.btn-paper {
  @apply bg-white text-black active:bg-slate-200;
  margin-right: 3vw;
}
.btn-comfirm {
  @apply bg-btn text-white active:bg-btn-active;
}
</style>
