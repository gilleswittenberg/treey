import { Id, FullName } from "./types/types"

const createFullName = (id: Id) : FullName => {
  const protocol = id.protocol ? `%${ id.protocol }` : ""
  const name = `@${ id.name }`
  return `${ protocol }${ name }`
}

export default createFullName
