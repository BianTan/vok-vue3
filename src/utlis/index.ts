export const arrToObj = <T extends { id?: number }>(arr: Array<T>) => {
  return arr.reduce((prev, current) => {
    if (current.id) {
      prev[current.id] = current
    }
    return prev
  }, {} as { [key: number]: T })
}

export const objToArr = <T>(obj: {[key: string]: T}) => {
  return Object.keys(obj).map(key => {
    return obj[key]
  })
}