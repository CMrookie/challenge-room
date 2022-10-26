<template>
  <main class="w-full h-full bg-main-bg">
      <ul class="challenge-list w-full h-full">
        <h3 class="btn-back" @click="back"></h3>
        <div class="container-wrap">
          <h2 class="header-title">我的答題</h2>
            <section class="container" v-for="i in 15" :key="i">
              <!-- <div class="time">60s</div> -->
              <div class="progress">{{i+"/20"}}</div>
              <div class="title">視頻答題</div>
              <div>
                <ChallengeQuestion></ChallengeQuestion>
              </div>
              <div class="analysis-box">
                解析:
                <p class="text-x text-black">題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx，xxxxx題目解析:xxxxxx</p>
              </div>
            </section>
            <var-back-top :duration="300" />
        </div>
      </ul>

  </main>
</template>

<script lang="ts" setup>
import ChallengeQuestion from '../components/challengeQuestion.vue'
const router = useRouter()

const a = ref('a')

// go back -> archives
function back(){
  router.push({ path:'/archives'})
}
</script>

<style>
.container-wrap {
  @apply flex items-center flex-col;
  padding-top: 1vh;
}
.container {
  @apply bg-white border-solid border-black border-2 relative rounded p-9;
  padding-top: 15vw;
  width: 90vw;
  margin-bottom: 5vw;
}

.progress {
  @apply bg-progress bg-no-repeat bg-cover text-center text-white absolute;
  padding-top: 0.5vw;
  width: 10vw;
  height: 7vw;
  right: -1.7vw;
  top: 3vw;
  font-size: 3vw;
}
.title {
  @apply bg-title bg-no-repeat bg-cover text-btn absolute m-auto text-center;
  width: 35vw;
  height: 7vw;
  left: 0;
  right: 0;
  top: 3vw;
  line-height: 7vw;
  font-size: 4vw;
}
.header-title {
  @apply text-xl font-semibold text-black;
  margin-bottom: 5vw;
  font-size: 4vw;
}
.analysis-box {
  @apply text-xl text-black box-border border-2 border-black rounded;
  font-size: 2.5vw;
  padding: 1vw;
}
.challenge-list {
  @apply overflow-auto scroll-smooth;
}
.challenge-list::-webkit-scrollbar {
  width: 0 !important;
  height: 0px !important;
}
.btn-back {
  @apply bg-back bg-cover bg-no-repeat relative left-10 top-10;
  width: 7vw;
  height: 7vw;
}
</style>
