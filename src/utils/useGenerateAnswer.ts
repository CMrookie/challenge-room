export function useGenerateAnswer() {
  function generateAnswer(questionOptions: { default: boolean }[]) {
    return questionOptions.map((option: { default: boolean }) => {
      if (option.default === false) return 0
      return 1
    })
  }
  function generateAnswerList(questionsList: { options: any }[]) {
    return questionsList.map((item: { options: any }) => {
      return generateAnswer(item.options)
    })
  }
  function initUserAnswer(questionList: { options: unknown[] }[]) {
    return questionList.map((item: { options: unknown[] }) => {
      return item.options.map((_option) => 0)
    })
  }
  return { generateAnswerList, initUserAnswer }
}
