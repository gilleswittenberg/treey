const isId = (id: Id, id1: Id) : boolean => id.protocol === id1.protocol && id.name === id1.name
export default isId
