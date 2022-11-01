import { useAppStore } from '@/store/app'

export function useScoreBoardInfo() {
  const stuName = ref<string>('')
  const testTime = ref<string>('')
  const startTime = ref<string>('')
  const endTime = ref<string>('')
  const store = useAppStore()
  const score = ref<number>(0)
  const theme = computed(() => store.questionsData.change.name)
  const designation = computed(() => {
    if (score.value < 60) return '下次努力'
    if (score.value < 80 && score.value >= 60) return '仍需努力'
    if (score.value < 100 && score.value >= 80) return '下次争夺挑战王'
    if (score.value === 100) return '挑战王者'
  })
  const accuracy = computed(() => {
    let correctNum = 0
    store.questionList.forEach((item: any) => {
      console.log(correctNum)
      if (item.isCorrect) correctNum++
    })
    return (correctNum / store.questionList.length) * 100 + '%'
  })

  // onMounted(setStudentInfo)
  return {
    score,
    designation,
    stuName,
    theme,
    testTime,
    accuracy,
    startTime,
    endTime
  }
}
