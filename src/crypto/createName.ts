import random from "./random"

const aToZ = "0123456789abcdefghjkmnpqrstvwxyz"
const randomIntBetween = (end: number) => Math.floor(random() * end)

const createName = () : Name => {
  const length = 26
  return "x".repeat(length).replace(/x/g, () => {
    const i = randomIntBetween(aToZ.length)
    return aToZ[i]
  })
}
export default createName
