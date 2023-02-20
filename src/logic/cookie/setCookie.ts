import { Options, OptionsAddPath, KeysOptions } from "../typeCookie"

function setCookie(name: string, value: string, options: Options) {
  const optionsAddDefaultPath: OptionsAddPath = {
    path: "/",
    ...options,
  }

  optionsAddDefaultPath.expires = new Date(
    Date.now() + Number(options.expires)
  ).toUTCString()

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value)

  const optionKeys = Object.keys(optionsAddDefaultPath) as Array<KeysOptions>

  optionKeys.forEach((optionKey: KeysOptions) => {
    updatedCookie += "; " + optionKey + "=" + optionsAddDefaultPath[optionKey]
  })

  document.cookie = updatedCookie
}
export default setCookie
