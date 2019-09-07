import * as treey from "./treey"
import * as crud from "./crud"
import createFullName, { parseFullName } from "./factories/createFullName"

export default {
  treey,
  crud,
  utils: {
    createFullName,
    parseFullName
  }
}
