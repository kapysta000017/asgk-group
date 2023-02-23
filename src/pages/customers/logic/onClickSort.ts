import { URLSearchParamsInit, NavigateOptions } from "react-router-dom"

const onClickSort = (
  e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
  setSearchParams: (
    nextInit?:
      | URLSearchParamsInit
      | ((prev: URLSearchParams) => URLSearchParamsInit)
      | undefined,
    navigateOpts?: NavigateOptions | undefined
  ) => void,
  searchParams: URLSearchParams
) => {
  const target = e.target as typeof e.target
  const element = target as HTMLElement
  const parentElement = element.parentElement as HTMLElement
  let textContent = ""
  if (parentElement.tagName === "DIV") {
    textContent = (parentElement?.childNodes[0].childNodes[0] as HTMLElement)
      .textContent as string
  }
  textContent = (parentElement?.childNodes[0] as HTMLElement)
    .textContent as string
  const objParams: Record<string, string> = {}
  if (searchParams.get(textContent) === "up") {
    objParams[textContent] = "down"
  } else {
    objParams[textContent] = "up"
  }

  setSearchParams(objParams)
}

export default onClickSort
