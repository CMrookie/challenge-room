<template>
  <div class="score-board">
    <div class="score-board-title"></div>
    <div>
      <i v-for="i in starNum" :key="i" class="star"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>
const starNum = ref<number>(0)
</script>
