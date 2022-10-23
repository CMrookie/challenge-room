<template>
  <div v-if="type === 'correct'" class="correct"></div>
  <div v-if="type === 'cross'" class="cross"></div>
</template>

<script lang="tsx" setup>
interface Props {
  type: string
}

const props = defineProps<Props>()
const tip = ref('')

console.log('run', props.type)

watch(
  () => props.type,
  (newVal, oldVal) => {
    console.log('type: ', newVal, oldVal)
    if (newVal == 'a') tip.value = 'a'
    if (newVal == 'b') tip.value = 'b'
  }
)
</script>

<style scoped>
.correct,
.cross {
  @apply bg-no-repeat bg-cover;
  width: 70vw;
  height: 70vw;
}
.correct {
  @apply bg-answer-right;
}
.cross {
  @apply bg-answer-wrong;
}
</style>
