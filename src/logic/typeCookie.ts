export type Options = {
  expires?: string
  "max-age"?: string
}
export type OptionsAddPath = { path: string } & Options
export type KeysOptions = keyof OptionsAddPath
