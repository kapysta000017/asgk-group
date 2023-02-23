import news from "./Search.module.css"
import search from "./../../../../assets/img/search.svg"
import { useSearchParams } from "react-router-dom"

export default function Form() {
  const [searchParams, setSearchParams] = useSearchParams()

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      search: { value: string }
    }
    searchParams.set("lastName", target.search.value)
    setSearchParams(searchParams)
  }

  return (
    <form className={news.form} autoComplete="off" onSubmit={submit}>
      <input
        className={news.search}
        type="search"
        name="search"
        placeholder="Поиск по фамилиям с большой буквы"
      />
      <button className={news.button}>
        <img className={news.searchIcon} src={search as string} alt="search" />
      </button>
    </form>
  )
}
