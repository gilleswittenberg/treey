const store: Record<FullName, DBItem> = {}

export const create = async (item: DBItem) : Promise<DBItem> => {
  const id = item.id
  store[id] = item
  return item
}

export const read = async (id: FullName) : Promise<OptionalDBItem> => {
  return store[id]
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
  Object.keys(store).forEach((key: FullName) => delete store[key])
  return await index()
}
