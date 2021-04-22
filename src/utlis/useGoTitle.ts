import useScrollTo from "./useScrollTo"

export default (idName: string): any => {
  const title = document.querySelector(`#${idName}`)
  const top = (title as HTMLElement).offsetTop
  if(top) useScrollTo(300, top - 80)
}
