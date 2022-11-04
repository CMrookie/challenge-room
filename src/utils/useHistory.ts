import { getHistoryList } from '@/api'
import { Snackbar } from '@varlet/ui'
// import { devLog } from './devLog'

export function useHistory() {
  const historyQuestionList = ref<any[]>([])
  const stuName = ref<string>('')
  const startTime = ref<string>('')
  const endTime = ref<string>('')
  const testTime = ref<string>('')
  const score = ref<number>(0)
  const theme = ref<string>('')
  const designation = computed(() => {
    if (score.value < 60) return ''
    if (score.value < 80 && score.value >= 60) return ''
    if (score.value < 100 && score.value >= 80) return ''
    if (score.value === 100) return '恭喜您。答題全對！'
  })

  async function getHistory() {
    try {
      const res: any = await getHistoryList()
      if (res.code === 200) {
        startTime.value = res.data.created_at
        score.value = Math.floor(Number(res.data.grade))
        endTime.value = res.data.updated_at
        stuName.value = res.data.user.truename
        theme.value = res.data.appoints.changes.name
        testTime.value = getTestTime(startTime.value, endTime.value)
      } else {
        Snackbar.warning(res.msg)
      }
    } catch (error: any) {
      Snackbar.error(error)
    }
  }

  function getTestTime(start: string, end: string) {
    const _start: number = new Date(start).getTime()
    const _end: number = new Date(end).getTime()
    return String((_end - _start) / 1000)
  }

  onMounted(getHistory)

  return {
    historyQuestionList,
    startTime,
    endTime,
    testTime,
    stuName,
    score,
    theme,
    designation
  }
}
