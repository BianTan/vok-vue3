import { AdminStateProps } from "@/types"

export default {
  getRoutes: (state: AdminStateProps) => {
    return state.routes
  },
  getScreenSmall: (state: AdminStateProps) => {
    return state.screenSmall
  }
}