<!-- <template>
  vue 文件
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template> -->
<script lang="tsx">
import { RouteLocation } from 'vue-router'
// import LoadProgress from './components/loadProgress.vue'

export default defineComponent({
  setup() {
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
