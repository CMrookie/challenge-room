<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <div class="user-info">
      <div class="user-info-left">
        <div>
          <img src="" alt="" />
        </div>
      </div>
      <div class="user-info-rigth">
        <div class="name-wrap">
          <span class="name">这是名字</span>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-col">
            <span>班级：xx</span>
            <span>学号：xx</span>
          </div>
          <div class="flex flex-col">
            <span>就读学校：xx XXXXXXXXXXXXXX说</span>
            <span>ID：xx</span>
          </div>
        </div>
      </div>
    </div>
    <ul class="challenge-list">
      <template v-for="i in 15" :key="i">
        <li class="challenge-item">
          <div class="challenge-info">
            <div class="left">
              <span>近代史挑戰室一號室</span>
              <span>成績：90分</span>
            </div>
            <div class="right">
              <span>18/20</span>
              <span>2022年11月20日</span>
            </div>
          </div>
          <div class="btn-inquire">查詢</div>
        </li>
      </template>
    </ul>
    <ChallengeQuit></ChallengeQuit>
    <footer class="footer">
      <div class="bg-white border-r active:bg-slate-200">
        <i class="icon bg-test-black"></i>
        答題
      </div>
      <div class="bg-btn border-l text-white active:bg-btn-active">
        <i class="icon bg-paper-white"></i>
        個人檔案
      </div>
    </footer>
  </main>
</template>

<script lang="ts" setup>
import ChallengeQuit from '../components/challengeQuit.vue'
</script>

<style scoped>
.user-info {
  @apply border border-black rounded-md bg-white flex flex-row items-center;
  width: 90vw;
  height: 20vw;
  padding-left: 1.5vw;
  margin-top: 20vw;
}
.user-info-left {
  @apply bg-white border border-black rounded flex items-center justify-center;
  width: 18vw;
  height: 18vw;
  img {
    @apply w-full h-full;
  }
}
.user-info-rigth {
  width: calc(90vw - (18vw + 1.5vw));
  height: 20vw;
  padding: 2vw 3vw;
  .name-wrap {
    @apply font-normal;
    font-size: 3.5vw;
  }
  & > div:nth-child(2) {
    & > div {
      width: calc((90vw - (18vw + 1.5vw + 6vw)) / 2);
    }
    & > div span {
      @apply truncate;
      padding-top: 1vw;
      font-size: 2.5vw;
    }
  }
}
.challenge-list {
  @apply overflow-auto scroll-smooth;
  width: 90vw;
  height: 55vh;
  margin: 3vw 0;
}
.challenge-list::-webkit-scrollbar {
   width: 0 !important;
   height: 0px !important;
 }
.challenge-item {
  @apply flex justify-between;
  height: 12vw;
  margin-bottom: 2vw;
}
.challenge-info {
  @apply border-2 border-black rounded bg-white flex justify-between;
  width: calc(90vw - 20vw - 2vw);
  height: 12vw;
  div {
    @apply flex flex-col justify-between;
    padding: 1vw;
    &.right {
      @apply items-end;
    }
    &.left span:nth-child(1) {
      font-size: 3vw;
    }
    span {
      @apply text-slate-600;
      font-size: 2.5vw;
    }
  }
}
.btn-inquire {
  @apply border-2 border-black rounded bg-btn text-white  flex items-center justify-center active:bg-btn-active;
  width: 20vw;
  height: 12vw;
  font-size: 4vw;
  letter-spacing: 0.5vw;
}
.footer {
  @apply absolute bottom-0 flex w-full;
  div {
    @apply w-1/2 flex items-center justify-center border-t-2 border-black;
    padding-top: 3vw;
    padding-bottom: 3vw;
    font-size: 4vw;
    letter-spacing: 0.5vw;
    .icon {
      @apply inline-block bg-no-repeat bg-cover;
      width: 4vw;
      height: 5vw;
      margin-right: 3vw;
    }
  }
}
</style>
