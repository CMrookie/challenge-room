import { defineComponent } from 'vue'

export const Layout = defineComponent({
  name: 'LayoutComponent',
  setup() {
    return () => <div class="main">main</div>
  }
})
