export function useVideoProps() {
  const videoWidth = ref<number>(0)

  function calcvw2px() {
    const { width } = document.body.getBoundingClientRect()
    const vw = width / 100
    videoWidth.value = vw * 60
  }
  onMounted(() => {
    calcvw2px()
  })
  return { videoWidth }
}
