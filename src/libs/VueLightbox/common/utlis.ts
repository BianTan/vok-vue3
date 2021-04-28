/**
 * 节流
*/
export const throttle = <T extends (...args: any[]) => any>(callback: T, delay = 200, tiggleNow = true) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if(timer) return
    if(tiggleNow) {
      result = callback(args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        result = callback(args)
        timer = null
      }, delay)
    }
    return result
  }
}
