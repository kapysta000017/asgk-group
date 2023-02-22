import getCookie from "../../../../logic/cookie/getCookie"
import axios from "axios"

const submit = async (
  e: React.FormEvent<HTMLFormElement>,
  ids: Array<number>,
  setIsPopup: React.Dispatch<React.SetStateAction<boolean>>,
  setMessageError: React.Dispatch<React.SetStateAction<string>>
) => {
  e.preventDefault()
  const target = e.target as typeof e.target & {
    message: { value: string }
  }
  const message = target.message.value
  const idsString = ids.join()
  try {
    const responsePush = await axios(
      `https://api.asgk-group.ru/v1/${getCookie("forRequest")}/message/push`,
      {
        method: "POST",
        data: {
          user_id: idsString,
          // date_start: "2022-12-31T10:00:00.000Z",
          push_message: message,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("singIn"),
        },
      }
    )
    alert(
      `id рассылки ${responsePush.data.message_id} для ${responsePush.data.users_count} клиент(-а)(-ов)`
    )
  } catch (error) {
    const e = error as Error
    const message = e.message
    setMessageError(message)
  }
  setIsPopup(false)
}

export default submit
