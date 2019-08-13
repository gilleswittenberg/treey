import createUnknownTreeItem from "../../src/factories/createUnknownTreeItem"

test("unknown TreeItem", () => {
  const id = { name: "joe" }
  const treeItem = createUnknownTreeItem(id)
  expect(treeItem.name).toBe("@joe")
  expect(treeItem.isKnown).toBe(false)
})
