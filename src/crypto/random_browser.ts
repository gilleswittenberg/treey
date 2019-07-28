// @LINK: https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const random = () =>
  window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967295

export default random
