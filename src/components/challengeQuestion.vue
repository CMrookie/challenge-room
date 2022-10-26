<template>
  <div>
    <p class="question">
      这是题目，现在没有，所以随便写一些这是题目，现在没有，所以随便写一些这是题目，现在没有，所以随便写一些
    </p>
    <slot></slot>
    <ul class="answer-oprions">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="answer-option-item"
        :class="setItemState(index)"
        @click="optionSelect(index)"
      >
        <i class="select-icon"></i>
        <p class="answer-text">选项1</p>
        <i class="assert-icon"></i>
      </li>
      <!-- <li class="answer-option-item select">
        <i class="select-icon"></i>
        <p class="answer-text">选项1</p>
        <i class="assert-icon"></i>
      </li> -->
      <!-- <li class="answer-option-item wrong">
        <i class="select-icon"></i>
        <p class="answer-text">选项1</p>
        <i class="assert-icon"></i>
      </li> -->
      <!-- <li class="answer-option-item correct">
        <i class="select-icon"></i>
        <p class="answer-text">选项1</p>
        <i class="assert-icon"></i>
      </li>
      <li class="answer-option-item wrong select">
        <i class="select-icon"></i>
        <p class="answer-text">选项1</p>
        <i class="assert-icon"></i>
      </li>
      <li class="answer-option-item correct select">
        <i class="select-icon"></i>
        <p class="answer-text">选项1</p>
        <i class="assert-icon"></i>
      </li> -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { devLog } from '@/utils/devLog'

interface Props {
  anwser: number[]
  userAnwser: number[]
  options: { content: string }[]
  title: string
  assert?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  assert: false
})
const emit = defineEmits(['select'])
function optionSelect(index: number) {
  devLog(['click option: ', index])
  emit('select', index)
}
watch(
  () => props.assert,
  () => {}
)

function setItemState(index: number) {
  if (props.anwser[index] === props.userAnwser[index] && props.assert)
    return ['select', 'correct']
  if (props.anwser[index] !== props.userAnwser[index] && props.assert)
    return ['select', 'wrong']
  if (props.userAnwser[index] === 1) return ['select']
  if (props.userAnwser[index] === 0) return ['']
}
</script>

<style>
.question {
  @apply text-slate-600 font-semibold;
  font-size: 3.5vw;
}
.answer-oprions {
  padding-top: 4vw;
}
.answer-option-item {
  @apply bg-question rounded-md w-full flex flex-row items-center relative;
  padding: 2vw 8vw 2vw 6vw;
  margin-bottom: 2vw;
  .select-icon {
    @apply bg-select-off bg-no-repeat bg-cover absolute top-0 bottom-0;
    left: 2vw;
    width: 2vw;
    height: 2vw;
    margin: auto;
  }
  .answer-text {
    padding-left: 1vw;
    font-size: 3vw;
  }
  &.select {
    @apply bg-question-select text-btn;
    .select-icon {
      @apply bg-select-on;
    }
  }
  &.correct {
    @apply bg-question-correct text-white;
    .assert-icon {
      @apply bg-tick bg-no-repeat bg-cover absolute top-0 bottom-0;
      right: 2vw;
      width: 4vw;
      height: 3vw;
      margin: auto;
    }
    &.select {
      .select-icon {
        @apply bg-select-on;
      }
    }
  }
  &.wrong {
    @apply bg-question-wrong;
    .assert-icon {
      @apply bg-cross bg-no-repeat bg-cover absolute top-0 bottom-0;
      right: 2vw;
      width: 4vw;
      height: 3vw;
      margin: auto;
    }
    &.select {
      .select-icon {
        @apply bg-select-on;
      }
    }
  }
}
</style>
