<script lang="tsx">
import { PropType } from 'vue'

interface LoadProgressProps {
  // progress: number
  preloadList: string[]
}
export default defineComponent({
  props: {
    preloadList: {
      type: Array as PropType<string[]>,
      default: null
    }
  },
  emits: {},
  setup(props, { emit }) {
    const progress = ref<number>(0)
    function preloadImages(imagesList: string[]) {
      let len: number = imagesList.length
      let i = 0
      imagesList.forEach((item: string) => {
        let image = new Image()
        image.onload = (e) => {
          i++
          console.log(Math.floor((i / len) * 100) + '%')
          progress.value = Math.floor(i / len) * 100
        }
        image.src = item
      })
    }
    onMounted(() => {
      console.log('mounted')
      preloadImages(props.preloadList)
    })

    return () => (
      <div class="progress-container">
        <progress max="100" value={progress.value}></progress>
      </div>
    )
  }
})
</script>

<style>
.pregress-container {
  @apply w-full h-full flex items-center justify-center;
  progress {
    @apply w-4/5;
  }
}
</style>
