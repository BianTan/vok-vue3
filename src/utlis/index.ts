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
  return (...args: Parameters<T>): void => {
    if(timer) return
    if(tiggleNow) {
      callback(args)
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        callback(args)
        timer = null
      }, delay)
    }
  }
}

export const buildToc = (contentId: string, listId: string) => {
  const content = document.getElementById(contentId)
  if (!content) {
    return
  }
  const tree = content.querySelectorAll('*'),
    ele = document.getElementById(listId),
    tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    // 初始化一个有序列表
    rootList = document.createElement('ol')
  // 当前的根列表
  let list = rootList,
    lastLevel = 1

  ele.append(rootList)

  tree.forEach(function (node, index) {
    // 当前 nodeName 存在于 H 标签列表；H 标签是否存在有效标题
    if (
      tags.indexOf(node.nodeName.toLowerCase()) !== -1 &&
      node.textContent.length > 0
    ) {
      // 标记该标题的 id hash 以便跳转
      node.setAttribute('id', 'toc-' + index)

      // 获取 H 标签的级别
      const level = parseInt(node.nodeName.slice(1)),
        // 为该 H 标题创建索引<li level=1><a href="#toc-1">title</a></li>
        li = document.createElement('li'),
        a = document.createElement('a')
      // 标记索引级别
      li.setAttribute('data-level', level.toString())
      li.setAttribute('class', 'list-decimal py-005')
      a.setAttribute('href', '#toc-' + index)
      a.setAttribute('data-id', 'toc-' + index)
      a.setAttribute('title', node.textContent)
      a.setAttribute('class', 'hover:text-blue-800 transition-all')
      a.textContent = node.textContent
      li.appendChild(a)

      if (index === 0 || lastLevel === level) {
        // 将大标题插入根列表
        list.appendChild(li)
      } else if (lastLevel < level) {
        if (list.hasChildNodes()) {
          // 当前较上一标题为小标题则创建子列表，并插入索引
          const ol = document.createElement('ol')
          ol.setAttribute('class', 'toc-list list-outside')
          ol.appendChild(li)
          list.appendChild(ol)
          // 更新当前的根列表
          list = ol
        } else {
          // 上层根列表不存在索引则直接插入
          list.appendChild(li)
        }
      } else if (lastLevel > level) {
        // 当前较上一标题为大标题则创建子列表，则获取差几级
        const diff = lastLevel - level
        if (diff < 6) {
          // 以当前根列表为基准，向父层遍历到所属层级根列表
          let tmpList: any = list
          for (let i = 1; i < 6; i++) {
            if (tmpList.parentNode) {
              tmpList = tmpList.parentNode
              // 判断是否与该列表内索引层级一致 253,242如果返回
              if (
                tmpList.firstElementChild.getAttribute('data-level') ===
                  level ||
                i === diff
              ) {
                break
              }
            }
          }
          tmpList.appendChild(li)
          list = tmpList
        } else {
          // 增强校错
          rootList.appendChild(li)
          list = rootList
        }
      }
      lastLevel = level
    }
  })

  if (rootList.hasChildNodes()) ele.parentElement.classList.remove('hidden')

  return ele.querySelectorAll('a')
}

export const setTitleTreeHighlight = (titleList: any, titleTree: any) => {
  const scrollTop = window.pageYOffset
  let topTitle: any
  let idx: number
  titleList.forEach((title: HTMLElement, index: number) => {
    if (title.offsetTop - 80 > scrollTop) return
    if (!topTitle || title.offsetTop - 80 >= topTitle.offsetTop) {
      topTitle = title
      idx = index
    }
  })
  titleTree.forEach((title: HTMLElement, index: number) => {
    if (index === idx) return title.classList.add('text-blue-800')
    title.classList.remove('text-blue-800')
  })
}
