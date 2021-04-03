import { AdminStateProps } from "@/types"
import { termTo } from "@/utlis"

export default {
  getRoutes: (state: AdminStateProps) => {
    return state.routes
  },
  getScreenSmall: (state: AdminStateProps) => {
    return state.screenSmall
  },
  getCategoryList: (state: AdminStateProps) => {
    return termTo(state.categoryList)
  },
  getTagList: (state: AdminStateProps) => {
    return termTo(state.tagList)
  },
  getStatusList: (state: AdminStateProps) => {
    return state.statusList
  }
}