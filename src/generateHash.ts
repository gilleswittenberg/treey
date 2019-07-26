import { Hash } from "./types"
import * as multiformat from "multihashes"

const generateHash = (obj: Object) : Hash => {
  const message = JSON.stringify(obj)
  const buffer = new multiformat.Buffer(message, "hex")
  const encoded = multiformat.encode(buffer, "sha2-256")
  return encoded.toString()
}

export default generateHash
