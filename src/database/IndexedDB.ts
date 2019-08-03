import DBItem, { DBItems } from "../types/DBItem"
import { UUID } from "../types/types"

type IDBDatabaseEvent = Event & { target: { result: IDBDatabase } }
type IDBDatabaseEventItem = Event & { target: EventTarget | null }
type IDBDatabaseEventItems = Event & { target: EventTarget | null }

// Initialization

const databaseName = "Treey"

const initIndexedDB = async () => {

  return new Promise<IDBDatabase>((resolve, reject) => {

    if (!window.indexedDB) reject("IndexedDB not supported")

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


// API

const getItem = async (id: UUID) => {
  return new Promise<DBItem>((resolve, reject) => {

    const request = objectStore.get(id)
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = (event: IDBDatabaseEventItem) => {
      if (event.target == null) return reject()
      const item = (event.target as IDBRequest).result
      resolve(item)
    }
  })
}

const getItems = async () => {
  return new Promise<DBItems>((resolve, reject) => {

    const request = objectStore.getAll()
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = (event: IDBDatabaseEventItems) => {
      if (event.target == null) return reject()
      const items = (event.target as IDBRequest).result
      resolve(items)
    }
  })
}

const addItem = async (item: DBItem) => {
  return new Promise<DBItem>((resolve, reject) => {

    const request = objectStore.add(item)
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = event => {
      console.log(event)
      resolve(item)
    }
  })
}

const putItem = async (item: DBItem) => {
  return new Promise<DBItem>((resolve, reject) => {
    const request = objectStore.put(item)
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = event => {
      console.log(event)
      resolve(item)
    }
  })
}

const clear = async () => {
  return new Promise<DBItems>((resolve, reject) => {

    const request = objectStore.clear()
    request.onerror = event => {
      console.error(event)
      reject()
    }
    request.onsuccess = () => {
      resolve([])
    }
  })
}

export default {
  addItem,
  getItem,
  getItems,
  putItem,
  clear
}
