const useScrollTo = (duration = 200, to = 0, element = document.documentElement || document.body): any => {
  if(duration === 0) return
  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10

  setTimeout(() => {
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop == to) return
    useScrollTo(duration - 10, to)
  }, 10)
}

export default useScrollTo