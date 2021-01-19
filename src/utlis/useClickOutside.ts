import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (ele: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (ele.value) {
      if (ele.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.addEventListener('click', handler)
  })
  return isClickOutside
}
export default useClickOutside
