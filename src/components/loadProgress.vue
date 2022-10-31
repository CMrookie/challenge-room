<script lang="tsx">
import { PropType } from 'vue'

export default defineComponent({
  props: {
    preloadList: {
      type: Array as PropType<string[]>,
      default: null
    }
  },
  emits: ['load'],
  setup(props, { emit }) {
    const preloadList = [
      '../images/WechatIMG376.png',
      '../images/2222.png',
      '../images/bg.png',
      '../images/icon-01.png',
      '../images/icon-02.png',
      '../images/icon-03.png',
      '../images/icon-04.png',
      '../images/icon-05.png',
      '../images/part-01.png',
      '../images/part-02.png',
      '../images/part-03.png',
      '../images/part-04.png',
      '../images/part-05.png',
      '../images/part-08.png',
      '../images/part-09.png',
      '../images/part-10.png',
      '../images/zy_icon01a.png',
      '../images/zy_icon01b.png',
      '../images/zy_icon02a.png',
      '../images/zy_icon02b.png'
    ]
    // const progress = ref<number>(0)
    function preloadImages(imagesList: string[]) {
      let len: number = imagesList.length
      let i = 0
      imagesList.forEach((item: string) => {
        let image = new Image()
        image.onload = (e) => {
          i++
          // progress.value = Math.floor(i / len) * 100
          if (Math.floor(i / len) * 100 > 99) return emit('load')
        }
        image.src = item
      })
    }
    onMounted(() => {
      console.log('mounted')
      preloadImages(preloadList)
    })

    return () => (
      <div class="progress-container bg-main-bg">
        {/* <button
          type="button"
          class="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-rose-600 hover:bg-rose-500 focus:border-rose-700 active:bg-rose-700 transition ease-in-out duration-150 cursor-not-allowed"
          disabled=""
        > */}
        <div class="flex flex-col items-center">
          <svg
            class="animate-spin -ml-1 mr-3 h-20 w-20 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-75"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-100"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span class=" text-white" style="margin-top: 3vw; font-size: 3vw;">
            加载中,请稍候...
          </span>
        </div>
        {/* </button> */}
      </div>
    )
  }
})
</script>

<style>
.progress-container {
  @apply w-full h-full flex items-center justify-center;
}
</style>
