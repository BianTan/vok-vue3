import { AdminStateProps } from "@/types"
import { termTo } from "@/utlis"

export default {
  getRoutes: (state: AdminStateProps) => {
    return state.routes
  },
  getScreenSmall: (state: AdminStateProps) => {
    return state.screenSmall
  },
  getTableList: (state: AdminStateProps) => {
    return state.tableList
  },
  getCategoryList: (state: AdminStateProps) => {
    console.log(termTo(state.categoryList))
    return termTo(state.categoryList)
  },
  getTagList: (state: AdminStateProps) => {
    return termTo(state.tagList)
  }
}