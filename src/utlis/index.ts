require('dayjs/locale/zh-cn')
import { TermProps, OptionsProps } from '@/types'
import dayjs from 'dayjs'

/**
 * 数组转换对象 key 为 id
*/
export const arrToObj = <T extends { id?: string | number }>(arr: Array<T>) => {
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
 * Term 转格式
*/
export const termTo = (arr: Array<TermProps>): OptionsProps[] => {
  return arr.map((item: TermProps) => {
    const { id, name } = item
    return {
      id: Number(id),
      value: id,
      text: name
    }
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

/**
 * 获取文章状态
*/
export const getStatus = (value: string) => {
  let res = ''
  switch (value) {
    case 'publish':
      res = '已发布'
      break
    case 'draft':
      res = '草稿箱'
      break
    case 'trash':
      res = '回收站'
      break
  }
  return res
}

/**
 * 获取文章类型
*/
export const getPostType = (value: number) => {
  let res = ''
  switch (value) {
    case 0:
      res = '文章'
      break
    case 1:
      res = '留言'
      break
  }
  return res
}

/**
 * 防抖
*/
export const debounce = <T extends (...args: any[]) => any>(callback: T, delay = 200, tiggleNow = false) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    if(timer) clearTimeout(timer)
    if(tiggleNow) {
      const exec = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if(exec) {
        result = callback(args)
      }
    } else {
      timer = setTimeout(() => {
        result = callback(args)
      }, delay)
    }
    return result
  }
}

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
