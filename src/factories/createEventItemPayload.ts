import itemEvents from "../events/itemEvents"
import fromEntries from "../utils/fromEntries"

const throwError = (type: ItemEventType, message: string) : void => {
  throw new Error (`${ type }: ${ message }`)
}

const checkType = (type: BlueprintType, value: unknown) : boolean => {
  switch (type) {
  case "Id":
    if (typeof value !== "object") return false
    if (Object.keys(value as Record<string, unknown>).filter(key => !["protocol", "name"].includes(key)).length > 0) return false
    const id = value as Id
    if (typeof id.name !== "string") return false
    if (id.protocol !== undefined && id.protocol !== "string") return false
    return true
  case "JSON":
    return true
  case "Index":
    if (typeof value !== "number") return false
    if (value < 0) return false
    if (!Number.isInteger(value)) return false
    return true
  }
  return false
}

const createEventItemPayload = (type: ItemEventType, rawPayload?: ItemEventPayload) : OptionalItemEventPayload => {

  const blueprint = itemEvents[type].payloadBlueprint

  if (!blueprint) {
    if (rawPayload) throwError(type, "no payload allowed")
    return undefined
  }

  if (!rawPayload) {
    throwError(type, "no payload supplied")
    return undefined
  }

  const payloadEntries = blueprint.map(({ name, type, isRequired }) => {
    const value = rawPayload[name]
    if (value === undefined && isRequired) throw new Error (`${ type }: ${ name } is required`)
    if (value !== undefined && checkType(type, value) === false) throw new Error (`${ type }: ${ name } is not of type ${ type }`)
    return [name, value]
  })
  return fromEntries(payloadEntries)
}
export default createEventItemPayload
