import { ObjectDirective } from 'vue'

interface BindingProps {
  value: object | undefined;
}
interface OptionProps {
  imgs?: (imgAry: string[]) => void;
  openLightbox?: (id: string) => void;
}

export default {
  mounted(el: HTMLElement, binding?: BindingProps) {
    const _ops: OptionProps | null = binding.value
    const imgAry: string[] = []
    const allImg: NodeList = el.querySelectorAll('img')

    allImg.forEach((item: any, index: number) => {
      const href: string = item.parentNode.href
      if (!href) {
        const aNode = document.createElement("a")
        aNode.href = item.src
        aNode.setAttribute('data-lightbox', index.toString())
        item.parentNode.replaceChild(aNode, item)
        aNode.append(item)
      } else {
        item.parentNode.setAttribute('data-lightbox', index.toString())
      }
      imgAry.push(item.src)
    })

    el.addEventListener('click', (e: any) => {
      const target: any = e.target
      const res = [].includes.call(allImg, target)
      if(res) {
        e.preventDefault()
        const id: string = target.parentNode.getAttribute('data-lightbox')
        if(_ops && _ops.openLightbox) _ops.openLightbox(id)
      }
    })

    if(_ops && _ops.imgs) _ops.imgs(imgAry)
  }
} as ObjectDirective
