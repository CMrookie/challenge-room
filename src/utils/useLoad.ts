export function useLoaded() {
  const isLoaded = ref<boolean>(false)
  function handleLoad() {
    isLoaded.value = true
  }
  return { isLoaded, handleLoad }
}
