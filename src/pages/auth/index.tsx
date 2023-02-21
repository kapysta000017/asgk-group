import auth from "./index.module.css"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import onSubmitSetCookie from "./logic/onSubmitSetCookie"

function Auth() {
  const navigate = useNavigate()
  const [messageError, setMessageError] = useState("")

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      login: { value: string }
      password: { value: string }
    }
    const signIn = {
      login: target.login.value,
      password: target.password.value,
    }
    onSubmitSetCookie(signIn, navigate, setMessageError)
  }

  if (messageError) {
    return <div>Потише бричку, у нас ошибка {messageError}</div>
  }

  return (
    <form className={auth.inner} onSubmit={submit} autoComplete="off">
      <label className={auth.labelContainer}>
        <span className={auth.labelText}>Логин</span>
        <input name="login" type="text" className={auth.login} required />
      </label>
      <label className={auth.labelContainer}>
        <span className={auth.labelText}>Пароль</span>
        <input
          name="password"
          type="password"
          className={auth.password}
          required
        />
      </label>
      <button type="submit" className={auth.submit}>
        Зайти
      </button>
    </form>
  )
}

export default Auth
