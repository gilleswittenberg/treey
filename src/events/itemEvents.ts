import Create from "./itemEventCreate"
import Destroy from "./itemEventDestroy"
import Identify from "./itemEventIdentify"
import Unidentify from "./itemEventUnidentify"
import Set from "./itemEventSet"
import Relate from "./itemEventRelate"
import Unrelate from "./itemEventUnrelate"

const itemEvents: Record<ItemEventType, ItemEventReducer> = {
  Create,
  Destroy,
  Identify,
  Unidentify,
  Set,
  Relate,
  Unrelate
}
export default itemEvents
