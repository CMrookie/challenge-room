<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <div class="container-wrap">
      <h2 class="header-title">我的答題</h2>
      <section class="container">
        <!-- <div class="time">60s</div> -->
        <div class="progress">12/20</div>
        <div class="title">視頻答題</div>
        <div>
          <ChallengeQuestion></ChallengeQuestion>
        </div>
        <div class="analysis-box">
          解析:
          <p class="">題目解析:xxxxxx，xxxxx</p>
        </div>
      </section>
    </div>
<!--  -->
    <!-- <footer class="footer">
      <div class="next-btn">下一題</div>
    </footer> -->
    <!-- <ChallengeMask>
      <ChallengeScroeBoard></ChallengeScroeBoard>
    </ChallengeMask> -->
    <!-- <ChallengeMask v-if="false" @click="handleClick">
      <div class="text-white">
        <ChallengeTip :type="'cross'"></ChallengeTip>
      </div>
    </ChallengeMask> -->
  </main>
</template>

<script lang="ts" setup>
import ChallengeQuestion from '../components/challengeQuestion.vue'
import ChallengeMask from '../components/challengeMask.vue'
import ChallengeTip from '../components/challengeFeeback.vue'
import ChallengeScoreBoard from '../components/challengeScroeBoard.vue'
import ChallengeScroeBoard from '../components/challengeScroeBoard.vue'

const a = ref('a')

function handleClick() {
  a.value = 'b'
}
</script>

<style>
.container-wrap {
  @apply flex items-center flex-col;
  height: 86vh;
  padding-top: 4vh;
}
.container {
  @apply bg-white border-solid border-black border-2 relative rounded p-9;
  padding-top: 15vw;
  width: 90vw;
}
.time {
  @apply bg-time bg-no-repeat bg-cover text-center text-btn absolute text-4xl font-semibold;
  width: 16vw;
  height: 9vw;
  top: -1.3vw;
  text-indent: -3vw;
  line-height: 9vw;
}
.progress {
  @apply bg-progress bg-no-repeat bg-cover text-center text-white absolute text-2xl;
  padding-top: 1vw;
  width: 10vw;
  height: 7vw;
  right: -1.7vw;
  top: 3vw;
}
.title {
  @apply bg-title bg-no-repeat bg-cover text-btn text-3xl absolute m-auto text-center;
  width: 35vw;
  height: 7vw;
  left: 0;
  right: 0;
  top: 3vw;
  line-height: 7vw;
}
.footer {
  @apply absolute bottom-0 flex justify-center items-center;
  height: 14vh;
}
.next-btn {
  @apply bg-btn active:bg-btn-active border-2 border-solid border-black text-white rounded tracking-widest text-center;
  width: calc(100vw / 3);
  padding-top: 2vw;
  padding-bottom: 2vw;
  font-size: 4vw;
}
.header-title {
  @apply text-xl font-semibold text-black;
  margin-bottom: 5vw;
  font-size: 4vw;
}
.analysis-box{
  @apply text-xl text-black box-border border-2 border-black rounded;
  font-size: 2.5vw;
  padding: 1vw;
}
</style>
