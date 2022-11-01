import { useAppStore } from '@/store/app'

export function useScoreBoardInfo() {
  const stuName = ref<string>('')
  const theme = ref<string>('')
  const testTime = ref<string>('')
  const startTime = ref<string>('')
  const endTime = ref<string>('')
  const store = useAppStore()
  const score = ref<number>(0)
  const designation = computed(() => {
    if (score.value < 60) return ''
    if (score.value < 80 && score.value >= 60) return ''
    if (score.value < 100 && score.value >= 80) return ''
    if (score.value === 100) return '恭喜您。答題全對！'
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
