export function useGenerateAnswer() {
  function generateAnswer(questionOptions: { default: boolean }[]) {
    return questionOptions.map((option: { default: boolean }) => {
      if (option.default === false) return 0
      return 1
    })
  }
  function generateAnswerList(questionsList: { options: [] }[]): (0 | 1)[][] {
    return questionsList.map((item: { options: [] }) => {
      return generateAnswer(item.options)
    })
  }
  function initUserAnswer(questionList: { options: unknown[] }[]): (0 | 1)[][] {
    return questionList.map((item: { options: unknown[] }) => {
      return item.options.map((_option) => 0)
    })
  }
  return { generateAnswerList, initUserAnswer }
}
