<template>
  <div>
    <p class="question">
      {{ question ?? '' }}
    </p>
    <slot></slot>
    <ul class="answer-oprions">
      <li
        v-for="(option, index) in options ?? []"
        :key="index"
        class="answer-option-item"
        :class="setItemState(index)"
        @click="optionSelect(index)"
      >
        <i class="select-icon"></i>
        <p class="answer-text">{{ option.content }}</p>
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
  answer: number[]
  userAnswer: number[]
  options: { content: string }[]
  question: string
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
  () => {
    props.answer.forEach((item, index) => {
      setItemState(index)
    })
  }
)
watch(
  () => props.userAnswer,
  () => {
    props.answer.forEach((item, index) => {
      setItemState(index)
    })
  }
)

function setItemState(index: number) {
  if (props.assert) {
    if (
      props.answer[index] === props.userAnswer[index] &&
      props.answer[index] === 1
    )
      return ['select', 'correct']
    if (
      props.answer[index] !== props.userAnswer[index] &&
      props.answer[index] === 1
    )
      return ['correct']
    if (
      props.answer[index] !== props.userAnswer[index] &&
      props.answer[index] === 0
    )
      return ['select', 'wrong']
    // if
  }
  if (props.userAnswer[index] === 1) return ['select']
  if (props.userAnswer[index] === 0) return ['']
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
  padding: 2vw 8vw 2vw 8vw;
  margin-bottom: 2vw;
  .select-icon {
    @apply bg-select-off bg-no-repeat bg-cover absolute top-0 bottom-0;
    left: 2vw;
    width: 3vw;
    height: 3vw;
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
      width: 4vw;
      height: 4vw;
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
        width: 4vw;
        height: 4vw;
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
        width: 4vw;
        height: 4vw;
      }
    }
  }
}
</style>
