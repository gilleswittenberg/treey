const createFullName = (id: Id) : FullName => {
  const protocol = id.protocol ? `$${ id.protocol }` : ""
  const name = `@${ id.name }`
  return `${ protocol }${ name }`
}
export default createFullName

// @TODO: Unicode + escaping $, @
// @TODO: Build up RegExp from parts (and reuse)
export const parseFullName = (name: FullName) : OptionalId => {

  // check for eg. "@joe"
  const nameOnlyRegExp = /^@([A-Za-z0-9-]+)$/
  const nameOnlyMatch = name.match(nameOnlyRegExp)
  if (nameOnlyMatch != null)
    return { name: nameOnlyMatch[1] }

  // check for eg. "$protocol@joe"
  const protocolAndNameRegExp = /^\$([A-Za-z0-9-]+)@([A-Za-z0-9-]+)$/
  const protocolAndNameMatch = name.match(protocolAndNameRegExp)
  if (protocolAndNameMatch != null)
    return { protocol: protocolAndNameMatch[1], name: protocolAndNameMatch[2] }

  return undefined
}
