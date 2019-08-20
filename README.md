# Treey

Event sourced, database agnostic tree data structure
- Browser (IndexedDB)
- Node.js (memory)

## API
- init: async () : Promise<Optional<TreeItem>>
- read: async (id: Id) : Promise<Optional<TreeItem>>
- createAndAdd: async (data: Data, parentId: Id) : Promise<Optional<TreeItem>>
- update: async (id: Id, data: Data) : Promise<Optional<TreeItem>>
- remove: async (id: Id, parentId: Id, index: Index) : Promise<Optional<TreeItem>>
- move: async (id: Id, oldParentId: Id, oldIndex: Index, parentId: Id, index: Index) : Promise<Optional<TreeItem>>
