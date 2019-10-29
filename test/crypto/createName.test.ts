import createName from "../../src/crypto/createName"

test("createName", () => {
  const name = createName()
  expect(name.length).toBe(26)
})
