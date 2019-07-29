import isBrowser from "../utils/isBrowser"
import randomBrowser from "./random_browser"
import randomNode from "./random_node"

const random = isBrowser ? randomBrowser : randomNode
export default random
