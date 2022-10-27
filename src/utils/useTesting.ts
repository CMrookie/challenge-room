export function useTesting() {
  function mutipleSelect(answerList: number[], select: number) {
    const _answerList = answerList
    _answerList[select] === 1
      ? (_answerList[select] = 0)
      : (_answerList[select] = 1)
    return _answerList
  }
  function singleSelect(answerList: number[], select: number) {
    return answerList.map((answer, index) => {
      if (index === select) return 1
      return 0
    })
  }
  return { mutipleSelect, singleSelect }
}
