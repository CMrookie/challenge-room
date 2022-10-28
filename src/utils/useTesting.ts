export function useTesting() {
  function mutipleSelect(answerList: (0 | 1)[], select: number): (0 | 1)[] {
    const _answerList: (0 | 1)[] = answerList
    _answerList[select] === 1
      ? (_answerList[select] = 0)
      : (_answerList[select] = 1)
    return _answerList
  }
  function singleSelect(answerList: number[], select: number): (0 | 1)[] {
    return answerList.map((answer, index) => {
      if (index === select) return 1
      return 0
    })
  }
  return { mutipleSelect, singleSelect }
}
