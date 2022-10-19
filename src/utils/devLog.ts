export function devLog(arg?: unknown[]) {
  if (import.meta.env.DEV && !!arg) {
    console.log(...arg)
  }
}
