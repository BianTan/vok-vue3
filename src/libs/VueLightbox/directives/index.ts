import { ObjectDirective } from 'vue'

interface BindingProps {
  value: object | undefined;
}
interface OptionProps {
  getImgs?: (imgAry: string[]) => void;
  openLightbox?: (id: string) => void;
}

export default {
  mounted(el: HTMLElement, binding?: BindingProps) {
    console.log(binding.value)
    const _ops: OptionProps | null = binding.value
    const imgAry: string[] = []
    const allImg: NodeList = el.querySelectorAll('img')

    allImg.forEach((img: any, index: number) => {
      const href: string = img.parentNode.href  // 获取父节点的href
      if (!href) {  // 不存在说明img没有a标签包裹
        const aNode = document.createElement('a') // 创建a标签
        aNode.href = img.src  // 设置href为图片src
        aNode.setAttribute('data-lightbox', index.toString()) // 设置当前图片的id
        img.parentNode.replaceChild(aNode, img)  // 将img替换成创建的a标签
        aNode.append(img) // 创建的a标签内插入原先的img
      } else {
        img.parentNode.setAttribute('data-lightbox', index.toString())
      }
      /**
       * 原先：<img src="abc.com"/>
       * 结果：<a href="abc.com" data-lightbox="0">
       *        <img src="abc.com"/>
       *      </a>
      */
      imgAry.push(img.src)  // 将图片url插入imgAry内
    })

    el.addEventListener('click', (e: any) => {
      const target: any = e.target
      const res = [].includes.call(allImg, target)
      if(res) {
        e.preventDefault()  // 阻止默认事件
        const id: string = target.parentNode.getAttribute('data-lightbox')  // 获取当前点击图片的id
        if(_ops && _ops.openLightbox) _ops.openLightbox(id) // 回调函数，使用图片暗箱展示当前点击的图片
      }
    })

    if(_ops && _ops.getImgs) _ops.getImgs(imgAry) // 回调函数，参数是获取到的图片路径数组
  }
} as ObjectDirective
