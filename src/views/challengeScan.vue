<template>
  <main class="w-full h-full bg-main-bg">
    <ChallengeQuit @quit="handleQuit"></ChallengeQuit>
  </main>
</template>

<script lang="ts" setup>
import { devLog } from '@/utils/devLog'
import ChallengeQuit from '../components/challengeQuit.vue'

function handleQuit() {
  devLog(['quit'])
}
</script>
