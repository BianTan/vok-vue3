import { AdminStateProps, TermProps } from "@/types"
import { arrToObj } from "@/utlis"

export default {
  setScreenSmall(state: AdminStateProps, payload: boolean) {
    state.screenSmall = payload
  },
  setTableList(state: AdminStateProps, payload: any) {
    const { list, ...res } = payload
    state.tableList = {
      ...res,
      list: arrToObj(list)
    }
  },
  setCategoryList(state: AdminStateProps, payload: TermProps[]) {
    state.categoryList = payload
  },
  setTagList(state: AdminStateProps, payload: TermProps[]) {
    state.tagList = payload
  }
}