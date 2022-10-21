<template>
  <main class="w-full h-full bg-main-bg flex flex-col items-center relative">
    <section class="container">
      <div class="time">60s</div>
      <div class="progress">12/20</div>
      <div class="title">視頻答題</div>
      <div class="h-16">zhe shi zhan wei fu</div>
    </section>
    <footer class="absolute bottom-0">
      <div
        class="bg-btn active:bg-btn-active border-2 border-solid border-black text-white text-4xl rounded tracking-widest p-5 pl-16 pr-16"
      >
        下一題
      </div>
    </footer>
  </main>
</template>

<script lang="ts" setup></script>

<style>
.container {
  @apply mt-14 bg-white border-solid border-black border-2 relative rounded p-9;
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
  padding-top: 0.5vw;
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
</style>
