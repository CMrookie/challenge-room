export function useCountdown() {
  const timer = ref<number | undefined>(undefined)
  const questionTime = ref<number>(0)
  const feebackTime = ref<number>(0)
  const stayAnswerTime = ref<number>(0)

  function clearCountdown() {
    window.clearTimeout(timer.value)
  }
  function timeCountdown(countdownCallback: CallableFunction) {
    window.clearTimeout(timer.value)
    timer.value = window.setTimeout(timeCountdown, 1000, countdownCallback)
    countdownCallback()
  }
  return {
    timer,
    clearCountdown,
    timeCountdown,
    questionTime,
    feebackTime,
    stayAnswerTime
  }
}
