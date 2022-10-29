import { devLog } from './devLog'

export function useTesting() {
  const isFinish = ref<boolean>(false)
  const isFeeback = ref<boolean>(false)
  function mutipleSelect(answerList: (0 | 1)[], select: number): (0 | 1)[] {
    const _answerList: (0 | 1)[] = answerList
    _answerList[select] === 1
      ? (_answerList[select] = 0)
      : (_answerList[select] = 1)
    devLog(['mutipleSelect: ', _answerList])
    return _answerList
  }
  function singleSelect(answerList: number[], select: number): (0 | 1)[] {
    return answerList.map((answer, index) => {
      if (index === select) return 1
      return 0
    })
  }
  function assertAnswer(answerList: (0 | 1)[], userAnswerList: (0 | 1)[]) {
    // console.log(
    //   'assertAnswerLis: ',
    //   answerList.filter((item, index) => item !== userAnswerList[index])
    // )
    return answerList.filter((item, index) => item !== userAnswerList[index])
      .length > 0
      ? false
      : true
  }
  function calcScore(questionList: object[]) {
    let score = 0
    questionList.forEach((item: any) => {
      if (item.isCorrect) {
        score += item.grade ?? 0
      }
    })
    return score
  }
  return {
    isFinish,
    isFeeback,
    mutipleSelect,
    singleSelect,
    assertAnswer,
    calcScore
  }
}
