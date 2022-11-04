<script lang="tsx">
import { RouteLocation } from 'vue-router'
import { Transition } from 'vue'

export default defineComponent({
  setup() {
    document.body.addEventListener('touchstart', function (): boolean {
      return false
    })
    return () => (
      <>
        <router-view
          v-slots={{
            default: (scope: { Component: unknown; route: RouteLocation }) => (
              <Transition name="fade">{scope.Component}</Transition>
            )
          }}
        ></router-view>
      </>
    )
  }
})
</script>
