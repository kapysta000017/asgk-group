import axios from "axios"
import setCookie from "../../../logic/cookie/setCookie"
import getCookie from "../../../logic/cookie/getCookie"
import { NavigateFunction } from "react-router-dom"
import React from "react"

const onSubmitSetCookie = async (
  singIn: {
    login: string
    password: string
  },
  navigate: NavigateFunction,
  setMessageError: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const tokenSingIn = await axios(
      "https://api.asgk-group.ru/test-auth-only",
      {
        method: "POST",
        data: singIn,
      }
    )
    setCookie("singIn", tokenSingIn.data.auth_token, {
      expires: "86400e3",
      "max-age": "3600",
    })

    const tokenRequest = await axios(
      "https://api.asgk-group.ru/v1/authorization",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("singIn"),
        },
      }
    )
    setCookie("forRequest", tokenRequest.data.tokens[0].token, {
      expires: "86400e3",
      "max-age": "3600",
    })
    navigate("/customers", { replace: true })
  } catch (error) {
    const e = error as Error
    const message = e.message
    setMessageError(() => message)
  }
}

export default onSubmitSetCookie
