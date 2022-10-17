import { defineComponent } from 'vue'
// import { Layout } from '@/components/layout'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <router-view
          v-slots={{
            default: (scope: { Component: unknown }) => scope.Component
          }}
        ></router-view>
        {/* <Layout /> */}
      </div>
      /**
       * 对应sfc写法为
       * <router-view v-slot="{ Component }">
       *   <component :is="Component"></component>
       * </router-view>
       * 一般组件使用jsx/tsx时与sfc写法差别不大，但这里写法差别悬殊，并且缺乏文档
       * 此写法从https://blog.csdn.net/qq_44721831/article/details/127045275中得到，作者为gxhlh
       */
    )
  }
})
