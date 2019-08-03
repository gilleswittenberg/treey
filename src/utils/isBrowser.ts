const isNode = process.env.NODE_ENV === 'test' 
const isBrowser = !isNode
export default isBrowser
