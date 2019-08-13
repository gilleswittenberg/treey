import createFullName, { parseFullName } from "../../src/factories/createFullName"

describe("createFullName", () => {

  test("name", () => {
    const id = { name: "joe" }
    const fullName = createFullName(id)
    expect(fullName).toBe("@joe")
  })

  test("protocol", () => {
    const id = { protocol: "treey", name: "joe" }
    const fullName = createFullName(id)
    expect(fullName).toBe("$treey@joe")
  })
})

describe("parseFullName", () => {

  test("name", () => {
    const fullName = "@joe"
    const id = parseFullName(fullName)
    expect(id).toEqual({ name: "joe" })
  })

  test("UUID", () => {
    const fullName = "@1469fee4-9e59-4fcd-a1f3-109b3a386bc1"
    const id = parseFullName(fullName)
    expect(id).toEqual({ name: "1469fee4-9e59-4fcd-a1f3-109b3a386bc1" })
  })

  test("protocol", () => {
    const fullName = "$treey@joe"
    const id = parseFullName(fullName)
    expect(id).toEqual({ protocol: "treey", name: "joe" })
  })

  test("undefined", () => {
    const fullName = "joe"
    const id = parseFullName(fullName)
    expect(id).toBeUndefined()
  })
})
