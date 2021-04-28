import { reactive, ComputedRef, watch } from "vue"
import { throttle } from "./utlis"

export function useLightBox(buttonShowTime: number, data: ComputedRef<string[]>) {
  const state = reactive({
    isShow: false,
    sidebarIsShow: false,
    isLoaded: false,
    isButtonShow: false,
    currentId: 0,
    timer: null
  })

  /**
   * 重置 setTimeout
  */
  const resetTimer = () => {
    clearTimeout(state.timer)
    if (state.isButtonShow) {
      state.timer = setTimeout(
        () => state.isButtonShow = false,
        buttonShowTime
      )
    }
  }
  /**
   * @param {string | number} id
   * 外部可以从 instance 中调用该方法，使用图片暗箱来展示指定图片
  */
  const openLightbox = (id: string | number = 0): void => {
    state.currentId = typeof id === 'number' ? id : parseInt(id as string)
    state.isShow = state.isButtonShow = true
  }
  /**
   * 图片暗箱 wrapper 点击
  */
  const handleClick = (e: any): void => {
    if (e.target === e.currentTarget)
      state.sidebarIsShow
        ? (state.sidebarIsShow = false)
        : (state.isShow = false)
  }
  /**
   * @param {number} id
   * 侧边栏里面的项目点击时，展示指定 id 图片
  */
  const onSidebarItemClick = (id: number): void => {
    state.currentId = id
    resetTimer()
  }
  /**
   * 上一张图片
  */
  const goPrev = (): void => {
    state.currentId > 0
      ? state.currentId--
      : (state.currentId = data.value.length - 1)
    resetTimer()
  }
  /**
   * 下一张图片
  */
  const goNext = (): void => {
    state.currentId < data.value.length - 1
      ? state.currentId++
      : (state.currentId = 0)
    resetTimer()
  }
  /**
   * 切换侧边栏状态
  */
  const switchSidebarState = (): void => {
    state.sidebarIsShow = !state.sidebarIsShow
    resetTimer()
  }

  /**
   * keydown 事件
  */
  const keydown = (e: any): void => {
    const type = e[0].code
    switch (type) {
      case 'ArrowLeft':
        goPrev()
        break
      case 'ArrowRight':
        goNext()
        break
      case 'Escape':
      case 'Space':
        e[0].preventDefault()
        state.isShow = false
        break
    }
  }
  const buttonShow = () => {
    resetTimer()
    state.isButtonShow = true
  }
  const throttleKeydoen = throttle(keydown)
  const throttleShow = throttle(buttonShow, 50)

  /**
   * 监听状态变化
  */
  watch([() => state.isButtonShow, () => state.isShow], newValue => {
    clearTimeout(state.timer)
    if (newValue[0]) {
      // 这个是 isButtonShow
      state.timer = setTimeout(
        () => (state.isButtonShow = false),
        buttonShowTime
      )
    }
    if (newValue[1]) {
      // 这个是 isShow
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', throttleKeydoen)
      window.addEventListener('mousemove', throttleShow)
    } else if (!newValue[1]) {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', throttleKeydoen)
      window.removeEventListener('mousemove', throttleShow)
    }
  })

  return {
    state,
    openLightbox,
    handleClick,
    onSidebarItemClick,
    goPrev,
    goNext,
    switchSidebarState
  }
}