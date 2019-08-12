import * as multiformat from "multihashes"

const generateHash = (obj: Record<string, unknown>) : Hash => {
  const message = JSON.stringify(obj)
  const buffer = new multiformat.Buffer(message, "hex")
  const encoded = multiformat.encode(buffer, "sha2-256")
  return encoded.toString()
}

export default generateHash
