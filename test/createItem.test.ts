import createItem from "../src/createItem"

test("no events", () => {
  const item = createItem([])
  expect(item).toBeNull()
})
