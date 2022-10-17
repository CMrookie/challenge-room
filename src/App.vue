<!-- <template>
  vue 文件
  <router-view v-slot="{ Component }">
    <component :is="Component"></component>
  </router-view>
</template> -->
<script lang="tsx">
import { RouteLocation } from 'vue-router'

export default defineComponent({
  setup() {
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
