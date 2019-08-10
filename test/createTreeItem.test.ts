import createTreeItem from "../src/tree/createTreeItem"
import createEvent from "../src/createEvent"
import createItem from "../src/createItem"
import { ItemEventType } from "../src/types/Item"

test("leaf", () => {
  const eventCreate = createEvent(ItemEventType.Create)
  const eventIdentityAdd = createEvent(ItemEventType.IdentityAdd, { id: { name: "a" } })
  const item = createItem([eventCreate, eventIdentityAdd])
  const treeItem = createTreeItem(item)
  expect(treeItem.name).toBe("@a")
  expect(treeItem.relations).toEqual([])
  expect(treeItem.isKnown).toBe(true)
  expect(treeItem.isBurned).toBe(false)
  expect(treeItem.isCyclic).toBe(false)
})

test("relations", () => {
  const eventCreate = createEvent(ItemEventType.Create)
  const eventIdentityAddRelation0 = createEvent(ItemEventType.IdentityAdd, { id: { name: "r0" } })
  const relation0 = createItem([eventCreate, eventIdentityAddRelation0])
  const eventIdentityAddRelation1 = createEvent(ItemEventType.IdentityAdd, { id: { name: "r1" } })
  const relation1 = createItem([eventCreate, eventIdentityAddRelation1])
  const eventIdentityAdd = createEvent(ItemEventType.IdentityAdd, { id: { name: "a" } })
  const eventRelationAdd0 = createEvent(ItemEventType.RelationAdd, { id: { name: "r0" } })
  const eventRelationAdd1 = createEvent(ItemEventType.RelationAdd, { id: { name: "r1" } })
  const item = createItem([eventCreate, eventIdentityAdd, eventRelationAdd0, eventRelationAdd1])
  const treeItem = createTreeItem(item, [item, relation0, relation1])
  expect(treeItem.name).toBe("@a")
  expect(treeItem.relations.length).toBe(2)
  expect(treeItem.relations[0].name).toBe("@r0")
  expect(treeItem.relations[1].name).toBe("@r1")
})

test("isKnown", () => {
  const eventCreate = createEvent(ItemEventType.Create)
  const eventIdentityAddRelation1 = createEvent(ItemEventType.IdentityAdd, { id: { name: "r1" } })
  const relation1 = createItem([eventCreate, eventIdentityAddRelation1])
  const eventIdentityAdd = createEvent(ItemEventType.IdentityAdd, { id: { name: "a" } })
  const eventRelationAdd0 = createEvent(ItemEventType.RelationAdd, { id: { name: "r0" } })
  const eventRelationAdd1 = createEvent(ItemEventType.RelationAdd, { id: { name: "r1" } })
  const item = createItem([eventCreate, eventIdentityAdd, eventRelationAdd0, eventRelationAdd1])
  const treeItem = createTreeItem(item, [item, relation1])
  expect(treeItem.name).toBe("@a")
  expect(treeItem.relations.length).toBe(2)
  expect(treeItem.relations[0].name).toBe("@r0")
  expect(treeItem.relations[0].isKnown).toBe(false)
  expect(treeItem.relations[1].name).toBe("@r1")
  expect(treeItem.relations[1].isKnown).toBe(true)
})
