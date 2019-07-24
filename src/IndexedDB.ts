import Item, { Items, ItemEvent, ItemEvents } from "./Item"
import { UUID } from "./types"

type IDBDatabaseEvent = Event & { target: { result: IDBDatabase } }
type IDBDatabaseEventItem = Event & { target: { result: Item } }
type IDBDatabaseEventItems = Event & { target: { result: Items } }

const databaseName = "Treey"

const initIndexedDB = async () => {

  return new Promise<IDBDatabase>((resolve, reject) => {

    if (!window.indexedDB) {
        reject("IndexedDB not supported")
    }

    const request = window.indexedDB.open(databaseName, 1)

    request.onerror = event => {
      console.error("request.onerror", event)
      reject(event)
    }
    request.onsuccess = event => {
      const request = event.target as IDBRequest
      const db = request.result
      db.onerror = (event: Event) => {
        console.error("db.onerror", event)
        reject(event)
      }
      resolve(db)
    }
    request.onupgradeneeded = event => {

      if (event.oldVersion < 1) {

        const request = event.target as IDBRequest
        const db = request.result

        // objects
        const objectStore = db.createObjectStore("items", { autoIncrement: true })
        objectStore.createIndex("id", "id", { unique: true })
      }
    }
  })
}

let database: IDBDatabase
let objectStore: IDBObjectStore
(async () => {
  database = await initIndexedDB()
  objectStore = database.transaction("items", "readwrite").objectStore("items")
})()

const getItem = async (id: UUID) => {
  return new Promise<Item>((resolve, reject) => {

    const request = objectStore.get(id)
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = (event: IDBDatabaseEventItem) => {
      const entity = event.target.result
      resolve(entity)
    }
  })
}

const getItems = async () => {
  return new Promise<Items>((resolve, reject) => {

    const request = objectStore.getAll()
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = (event: IDBDatabaseEventItems) => {
      const items = event.target.result
      resolve(items)
    }
  })
}

const saveItem = async (entity: Item) => {
  return new Promise<boolean>((resolve, reject) => {

    const request = objectStore.add(entity)
    request.onerror = event => {
      console.error(event)
      reject(false)
    }
    request.onsuccess = event => {
      console.log(event)
      resolve(true)
    }
  })
}

const updateItem = async (id: UUID, entityEvent: ItemEvent) => {
  return new Promise<Item>((resolve, reject) => {

    const request = objectStore.get(id)
    request.onerror = event => reject()
    request.onsuccess = (event: IDBDatabaseEventItem) => {
      const entity = event.target.result
      // @TODO: Fail when burned
      entity.events.push(entityEvent)
      const putRequest = objectStore.put(entity)
      putRequest.onerror = event => reject()
      putRequest.onsuccess = event => {
        console.log(event)
        resolve(entity)
      }
    }
  })
}


export {
  saveItem,
  updateItem,
  getItems,
  getItem
}
