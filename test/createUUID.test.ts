import createUUID from "../src/createUUID"

const hex = "[0-9a-f]"
const uuidRegExp = new RegExp(`^${ hex }{8}-${ hex }{4}-${ hex }{4}-${ hex }{4}-${ hex }{12}$`, "i")

test("createUUID", () => {
  const uuid = createUUID()
  expect(uuid).toMatch(uuidRegExp)
})
