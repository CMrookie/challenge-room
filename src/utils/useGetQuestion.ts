import { getQuestions } from '@/api'
import { useAppStore } from '@/store/app'
import { Snackbar } from '@varlet/ui'
import { devLog } from './devLog'
import { useCountdown } from './useCountdown'

export function useGetQuestion() {
  const router = useRouter()
  const store = useAppStore()
  const { timeCountdown, clearCountdown } = useCountdown()
  let tryTime = 0
  let retrycountdownTime = 3
  function retryWrap(code: string) {
    function retryCountdown() {
      retrycountdownTime--
      if (retrycountdownTime <= 0) {
        clearCountdown()
        saveQuestion2Store(code)
      }
    }
    timeCountdown(retryCountdown)
  }
  async function saveQuestion2Store(code: string) {
    try {
      const res: any = await getQuestions({ code })
      devLog(['getQuestion data: ', res.data])
      if (res.code === 200) {
        if (res.msg) return res
        return (store.questionsData = res.data)
      } else {
        tryTime++
        if (tryTime < 3) {
          Snackbar.error(res.msg)
          nextTick(() => {
            retryWrap(code)
          })
        } else {
          router.push({ path: '/login' })
        }
      }
    } catch (error: any) {
      Snackbar.error(error.msg)
    }
  }
  return { saveQuestion2Store }
}
