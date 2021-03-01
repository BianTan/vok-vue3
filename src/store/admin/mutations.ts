import { AdminStateProps, StatusListProps, TermProps } from "@/types"

export default {
  setScreenSmall(state: AdminStateProps, payload: boolean) {
    state.screenSmall = payload
  },
  setTableList(state: AdminStateProps, payload: any) {
    const { list, ...res } = payload
    state.tableList = {
      ...res,
      list
    }
  },
  setCategoryList(state: AdminStateProps, payload: TermProps[]) {
    state.categoryList = payload
  },
  setTagList(state: AdminStateProps, payload: TermProps[]) {
    state.tagList = payload
  },
  setStatusList(state: AdminStateProps, payload: StatusListProps) {
    state.statusList = payload
  }
}