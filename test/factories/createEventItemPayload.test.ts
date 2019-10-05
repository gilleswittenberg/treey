import createEventItemPayload from "../../src/factories/createEventItemPayload"

test("Create", () => {
  const payload = createEventItemPayload("Create", undefined)
  expect(payload).toBeUndefined()
})

test("Create extra", () => {
  expect(() => createEventItemPayload("Create", { id : { name: "Joe" } })).toThrow()
})

test("Identify id", () => {
  const payload = createEventItemPayload("Identify", { id : { name: "Joe" } })
  expect(payload).toEqual({ id: { name: "Joe" } })
})

test("Identify id extra keys", () => {
  expect(() => createEventItemPayload("Identify", { id : { name: "Joe", extra: "x" } as Id })).toThrow()
})

test("Identify empty", () => {
  expect(() => createEventItemPayload("Identify", {})).toThrow()
})

test("Identify extra", () => {
  const payload = createEventItemPayload("Identify", { id : { name: "Joe" }, index: 1 })
  expect(payload).toEqual({ id: { name: "Joe" } })
})

test("Identify incorrect", () => {
  expect(() => createEventItemPayload("Identify", { incorrect: "" } as ItemEventPayload)).toThrow()
})

test("Identify extra incorrect", () => {
  const payload = createEventItemPayload("Identify", { id : { name: "Jane" }, index: 1, incorrect: "" } as ItemEventPayload)
  expect(payload).toEqual({ id: { name: "Jane" } })
})

test("Relate index lesser than zero", () => {
  expect(() => createEventItemPayload("Relate", { id: { name: "Joe" }, index: -1 })).toThrow()
})

test("Relate index as float", () => {
  expect(() => createEventItemPayload("Relate", { id: { name: "Joe" }, index: 0.5 })).toThrow()
})
