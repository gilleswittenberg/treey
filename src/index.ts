import * as treey from "./treey"
import * as crud from "./crud"
import createFullName, { parseFullName } from "./factories/createFullName"

export default treey
export { crud }
export { createFullName }
export { parseFullName }

export type Treey = typeof treey

// @TODO: Remove duplication. Use types from declaration files
export type Name = string
export type FullName = string
export type Protocol = string
export type Id = {
  name: Name
  protocol?: Protocol
}
export type Ids = Id[]
export type Data = any
export type Index = number
export type Schema = Record<string, unknown>
export type State = {
  readonly ids?: Ids
  readonly schema?: Schema
  readonly data?: Data
  readonly relations?: Ids
}
export type TreeItem = {
  readonly state: State
  readonly events: any[]
  readonly relations: TreeItems
  readonly name: FullName
  readonly isCyclic: boolean
  readonly isKnown: boolean
  readonly isDestroyed: boolean
}
export type TreeItems = TreeItem[]
