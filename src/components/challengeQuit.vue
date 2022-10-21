<template>
  <div
    class="bg-quit bg-cover bg-no-repeat absolute right-4 w-16 h-20 top-12"
    @click="handleClick"
  ></div>
</template>

<script lang="ts" setup>
const emit = defineEmits(['quit'])

function handleClick() {
  emit('quit')
}
</script>
