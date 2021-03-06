import createTreeItem from "../../src/factories/createTreeItem"
import { createItem } from "../../src/factories/createItem"
import createEvent from "../../src/factories/createEvent"

test("leaf", () => {
  const eventCreate = createEvent("Create")
  const eventIdentityAdd = createEvent("Identify", { id: { name: "a" } })
  const item = createItem([eventCreate, eventIdentityAdd])
  const treeItem = createTreeItem(item)
  expect(treeItem.name).toBe("@a")
  expect(treeItem.relations).toEqual([])
  expect(treeItem.isKnown).toBe(true)
  expect(treeItem.isDestroyed).toBe(false)
  expect(treeItem.isCyclic).toBe(false)
})

test("relations", () => {
  const eventCreate = createEvent("Create")
  const eventIdentityAddRelation0 = createEvent("Identify", { id: { name: "r0" } })
  const relation0 = createItem([eventCreate, eventIdentityAddRelation0])
  const eventIdentityAddRelation1 = createEvent("Identify", { id: { name: "r1" } })
  const relation1 = createItem([eventCreate, eventIdentityAddRelation1])
  const eventIdentityAdd = createEvent("Identify", { id: { name: "a" } })
  const eventRelationAdd0 = createEvent("Relate", { id: { name: "r0" } })
  const eventRelationAdd1 = createEvent("Relate", { id: { name: "r1" } })
  const item = createItem([eventCreate, eventIdentityAdd, eventRelationAdd0, eventRelationAdd1])
  const treeItem = createTreeItem(item, [item, relation0, relation1])
  expect(treeItem.name).toBe("@a")
  expect(treeItem.relations.length).toBe(2)
  expect(treeItem.relations[0].name).toBe("@r0")
  expect(treeItem.relations[1].name).toBe("@r1")
})

test("isKnown", () => {
  const eventCreate = createEvent("Create")
  const eventIdentityAddRelation1 = createEvent("Identify", { id: { name: "r1" } })
  const relation1 = createItem([eventCreate, eventIdentityAddRelation1])
  const eventIdentityAdd = createEvent("Identify", { id: { name: "a" } })
  const eventRelationAdd0 = createEvent("Relate", { id: { name: "r0" } })
  const eventRelationAdd1 = createEvent("Relate", { id: { name: "r1" } })
  const item = createItem([eventCreate, eventIdentityAdd, eventRelationAdd0, eventRelationAdd1])
  const treeItem = createTreeItem(item, [item, relation1])
  expect(treeItem.name).toBe("@a")
  expect(treeItem.relations.length).toBe(2)
  expect(treeItem.relations[0].name).toBe("@r0")
  expect(treeItem.relations[0].isKnown).toBe(false)
  expect(treeItem.relations[1].name).toBe("@r1")
  expect(treeItem.relations[1].isKnown).toBe(true)
})

test("isCyclic", () => {
  const eventCreate = createEvent("Create")
  const eventIdentityAdd = createEvent("Identify", { id: { name: "a" } })
  const eventRelationAdd = createEvent("Relate", { id: { name: "a" } })
  const item = createItem([eventCreate, eventIdentityAdd, eventRelationAdd])
  const treeItem = createTreeItem(item, [item])
  expect(treeItem.relations.length).toBe(1)
  expect(treeItem.relations[0].name).toBe("@a")
  expect(treeItem.relations[0].isCyclic).toBe(true)
  expect(treeItem.relations[0].relations.length).toBe(0)
})
