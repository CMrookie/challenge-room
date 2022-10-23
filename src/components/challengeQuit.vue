<template>
  <div class="btn-quit" @click="handleClick"></div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['quit'])

function handleClick() {
  emit('quit')
}
</script>

<style>
.btn-quit {
  @apply bg-quit bg-cover bg-no-repeat absolute right-4 top-12;
  width: 8vw;
  height: 10vw;
}
</style>
