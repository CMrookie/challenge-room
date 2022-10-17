import { defineStore } from 'pinia'

/**
 * ref()s become state properties
 * computed()s become getters
 * function()s become actions
 */
export const useAppStore = defineStore('app', () => {
  const firstName = ref<string>('')
  const lastName = ref<string>('')
  const count = ref<number>(0)

  const fullName = computed(() => `${firstName.value} ${lastName.value}`)

  function increment() {
    count.value++
  }

  return { firstName, lastName, fullName, increment }
})
