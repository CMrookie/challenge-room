import { getQuestions } from '@/api'
import { useAppStore } from '@/store/app'
import { Snackbar } from '@varlet/ui'

export function useGetQuestion() {
  const store = useAppStore()
  async function saveQuestion2Store(code: string) {
    try {
      const res: any = await getQuestions({ code })
      console.log('getQuestion data: ', res.data)
      if (res.code === 200) return (store.questionsData = res.data)
      return Snackbar.error(res.msg)
    } catch (error: any) {
      Snackbar.error(error.msg)
    }
  }
  return { saveQuestion2Store }
}
