import ReactDOM from "react-dom"
import popup from "./Popup.module.css"
import React from "react"
import submit from "./logic/onSubmit"

export default function Popup({
  setIsPopup,
  ids,
  setMessageError,
}: {
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>
  ids: Array<number>
  setMessageError: React.Dispatch<React.SetStateAction<string>>
}) {
  return ReactDOM.createPortal(
    <form onSubmit={(e) => submit(e, ids, setIsPopup, setMessageError)}>
      <div className={popup.view} onClick={() => setIsPopup(false)}></div>
      <div className={popup.container}>
        <h4 className={popup.title}>PUSH message</h4>
        <textarea className={popup.textarea} name="message" required></textarea>
        <button type="submit" className={popup.btn}>
          Отправить
        </button>
      </div>
    </form>,
    document.getElementById("modalPushMessage") as HTMLElement
  )
}
