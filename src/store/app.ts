import { defineStore } from 'pinia'

/**
 * ref()s become state properties
 * computed()s become getters
 * function()s become actions
 */
export const useAppStore = defineStore('app', () => {
  // const firstName = ref<string>('')
  // const lastName = ref<string>('')
  // const count = ref<number>(0)
  const qrCode = ref<string>('')
  const questionsData = ref<any>({})
  const answerList = ref<(0 | 1)[][]>([])
  const userAnswerList = ref<(0 | 1)[][]>([])
  const score = ref<number>(0)

  const questionList = computed(() => questionsData.value.question)
  // const fullName = computed(() => `${firstName.value} ${lastName.value}`)

  // function increment() {
  //   count.value++
  // }

  return {
    qrCode,
    questionsData,
    questionList,
    answerList,
    userAnswerList,
    score
  }
})
