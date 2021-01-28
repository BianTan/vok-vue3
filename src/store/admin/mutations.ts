import { AdminStateProps } from "@/types"

export default {
  setScreenSmall(state: AdminStateProps, payload: boolean) {
    state.screenSmall = payload
  }
}