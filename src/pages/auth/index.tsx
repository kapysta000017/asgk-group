import auth from "./index.module.css"
import React, { useState } from "react"
import axios from "axios"
import setCookie from "../../logic/cookie/setCookie"
import { useNavigate } from "react-router-dom"

function Auth() {
  const navigate = useNavigate()
  const [errorIs, setErrorIs] = useState("")

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
    request(signIn)
  }

  const request = async (singIn: { login: string; password: string }) => {
    try {
      const response = await axios("https://api.asgk-group.ru/test-auth-only", {
        method: "POST",
        data: singIn,
      })
      setCookie("singIn", response.data.auth_token, {
        expires: "86400e3",
        "max-age": "3600",
      })
      navigate("/customers", { replace: true })
    } catch (error) {
      const e = error as Error
      const message = e.message
      setErrorIs(() => message)
    }
  }

  if (errorIs) {
    return <div>Потише бричку, у нас ошибка</div>
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
