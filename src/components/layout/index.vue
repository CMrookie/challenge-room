<!-- eslint-disable vue/multi-word-component-names -->
<!-- <template>
  <layout></layout>
</template>

<script lang="ts" setup>
import { Layout } from './layout'
</script> -->
<script lang="tsx">
export default defineComponent({
  setup() {
    // const orientation = ref<number | null>(null)
    // window.addEventListener(
    //   'onorientationchange' in window ? 'orientationchange' : 'resize ',
    //   (e) => {
    //     console.log(e)
    //     orientation.value = window.orientation
    //   }
    // )
    return () => (
      <>
        <div>main</div>
      </>
    )
  }
})
</script>
