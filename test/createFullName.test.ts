import createFullName, { parseFullName } from "../src/createFullName"

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
