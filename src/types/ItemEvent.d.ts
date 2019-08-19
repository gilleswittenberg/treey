declare type ItemEventType =
  "Create" |
  "Destroy" |
  "Identify" |
  "Unidentify" |
  "Set" |
  "Relate" |
  "Unrelate"

declare type ItemEventPayload = {
  readonly id?: Id
  readonly data?: Data
  readonly index?: Index
}
declare type OptionalItemEventPayload = Optional<ItemEventPayload>

type BlueprintName = keyof ItemEventPayload
type BlueprintType = "Id" | "JSON" | "Index"
type PayloadBlueprint = {
  readonly name: BlueprintName
  readonly type: BlueprintType
  readonly isRequired: boolean
}
declare type ItemEventPayloadBlueprint = Optional<NonEmptyArray<PayloadBlueprint>>

declare type ItemEvent = {
  readonly type: ItemEventType
  readonly datetime: Date
  readonly payload?: ItemEventPayload
}
declare type ItemEvents = ItemEvent[]

type ItemEventReducerEmpty = (state: State) => State
type ItemEventReducerId = (state: State, id: Id) => State
type ItemEventReducerIdIndex = (state: State, id: Id, index?: Index) => State
type ItemEventReducerData = (state: State, data: Data) => State
type ItemEventReducerFunc = ItemEventReducerEmpty | ItemEventReducerId | ItemEventReducerIdIndex | ItemEventReducerData

declare type ItemEventReducer = {
  readonly type: ItemEventType
  readonly payloadBlueprint: ItemEventPayloadBlueprint
  readonly reducer: ItemEventReducerFunc
}
