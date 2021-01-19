import { computed } from 'vue'
import dayjs from 'dayjs'

export const useCommentCount = (count: number) => computed(() => {
  if(count === 0) {
    return '暂无评论'
  } else {
    return `${count} 条评论`
  }
})
export const useDayjs = (date?: string | number | Date | dayjs.Dayjs | undefined, format?: string | undefined) => computed(() => {
  return dayjs().format(format)
})
