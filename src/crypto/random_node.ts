import * as crypto from "crypto"

const random = () => {
  const byte = crypto
    .randomBytes(4)
    .readUInt32LE(0)
  return byte / 4294967295
}
export default random
