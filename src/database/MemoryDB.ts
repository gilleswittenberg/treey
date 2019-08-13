const store: Record<UUID, DBItem> = {}

export const create = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

export const read = async (id: UUID) : Promise<OptionalDBItem> => {
  const item = store[id]
  return item != null ? item : undefined
}

export const update = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

export const index = async () : Promise<DBItems> =>  {
  return Object.values(store)
}

export const clear = async () : Promise<DBItems> => {
  Object.keys(store).forEach((key: UUID) => delete store[key])
  return await index()
}
