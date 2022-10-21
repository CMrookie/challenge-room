<!-- <template>
  vue 文件
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template> -->
<script lang="tsx">
import { RouteLocation } from 'vue-router'
import LoadProgress from './components/loadProgress.vue'
import icon01 from './assets/images/icon-01.png'
import icon02 from './assets/images/icon-02.png'
import icon03 from './assets/images/icon-03.png'
import icon04 from './assets/images/icon-04.png'
import icon05 from './assets/images/icon-05.png'
import part01 from './assets/images/part-01.png'
import part02 from './assets/images/part-02.png'
import part03 from './assets/images/part-03.png'
import part04 from './assets/images/part-04.png'
import part05 from './assets/images/part-05.png'
import part06 from './assets/images/part-06.png'
import part07 from './assets/images/part-07.png'
import part08 from './assets/images/part-08.png'
import part09 from './assets/images/part-09.png'
import part10 from './assets/images/part-10.png'

export default defineComponent({
  setup() {
    const preloadList = [
      icon01,
      icon02,
      icon03,
      icon04,
      icon05,
      part01,
      part02,
      part03,
      part04,
      part05,
      part06,
      part07,
      part08,
      part09,
      part10
    ]
    // console.log(preloadList)
    document.body.addEventListener('touchstart', function (): boolean {
      return false
    })
    // <LoadProgress preloadList={preloadList}></LoadProgress>
    return () => (
      <>
        <router-view
          v-slots={{
            default: (scope: { Component: unknown; route: RouteLocation }) => (
              <transiton name={scope.route.meta.transiton || 'fade'}>
                {scope.Component}
              </transiton>
            )
          }}
        ></router-view>
      </>
    )
  }
})
</script>
