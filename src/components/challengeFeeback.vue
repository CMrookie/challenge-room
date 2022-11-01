<template>
  <div v-if="type === 'correct'" class="correct"></div>
  <div v-if="type === 'cross'" class="cross"></div>
  <div v-if="type === 'timeover'" class="time-over"></div>
</template>

<script lang="tsx" setup>
import { devLog } from '@/utils/devLog'

interface Props {
  type: string
}

const props = defineProps<Props>()
const tip = ref('')

console.log('run', props.type)

watch(
  () => props.type,
  (newVal, oldVal) => {
    devLog(['type: ', newVal, oldVal])
    if (newVal == 'a') tip.value = 'a'
    if (newVal == 'b') tip.value = 'b'
  }
)
</script>

<style scoped>
.correct,
.cross,
.time-over {
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
.time-over {
  @apply bg-over;
}
</style>
