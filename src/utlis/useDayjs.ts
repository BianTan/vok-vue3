import dayjs from 'dayjs'

export const useCommentCount = (count: number | undefined) => {
  if(count && count === 0) {
    return '暂无评论'
  } else {
    return `${count} 条评论`
  }
}
export const useDayjs = (date?: string | number | Date | dayjs.Dayjs | undefined, format?: string | undefined) => {
  return dayjs().format(format)
}
