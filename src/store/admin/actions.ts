import { AdminStateProps } from "@/types"
import { Commit } from "vuex"

interface Ictx {
  state: AdminStateProps;
  commit: Commit;
}
export default {
} 