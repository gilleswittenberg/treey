// @LINK: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const createUUID = () : string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string) => {
    // @TODO: Use cryptographically secure RNG
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}
export default createUUID