require('dayjs/locale/zh-cn')
import dayjs from 'dayjs'

/**
 * 数组转换对象 key 为 id
*/
export const arrToObj = <T extends { id?: string }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current.id) {
      prev[current.id] = current
    }
    return prev
  }, {} as { [key: string]: T })
}
/**
 * 对象转换数组
*/
export const objToArr = <T>(obj: {[key: string]: T}) => {
  return Object.keys(obj).map(key => {
    return obj[key]
  })
}

/**
 * 计算评论数量
*/
export const useCommentCount = (count: number | undefined) => {
  if(count && count === 0) {
    return '暂无评论'
  } else {
    return `${count} 条评论`
  }
}

/**
 * 时间格式转换
*/
export const useDay = (format?: string, date?: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).format(format)
}
/**
 * 时间格式转换 中文
*/
export const useDayzh = (format?: string, date?: string | number | Date | dayjs.Dayjs) => {
  return dayjs(date).locale('zh-cn').format(format)
}
