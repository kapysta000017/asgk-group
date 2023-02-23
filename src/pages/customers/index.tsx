import getCookie from "../../logic/cookie/getCookie"
import { Navigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/dispatch"
import { useAppSelector } from "../../hooks/selector"
import { useEffect, useRef } from "react"
import { fetchCustomers } from "../../store/sliceCustomers"
import { selectCustomers } from "../../store/sliceCustomers"
import { CustomerType } from "../../interface"
import table from "./index.module.css"
import Popup from "./components/popup/Popup"
import { useState } from "react"
import onCheck from "./logic/onCheckInput"
import Search from "./components/search/Search"
import { useSearchParams } from "react-router-dom"
import arrow from "./../../assets/img/arrow.svg"
import onClickSort from "./logic/onClickSort"

function Customers() {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const customers = useAppSelector(selectCustomers) as CustomerType[]

  const lastNameUrl = searchParams.get("lastName") || ""

  const [messageError, setMessageError] = useState<string>("")

  const [isPopup, setIsPopup] = useState<boolean>(false)

  const [ids, setIds] = useState<Array<number>>([])

  useEffect(() => {
    dispatch(fetchCustomers())
  }, [])

  if (!getCookie("singIn")) {
    return <Navigate to="/auth" replace={true} />
  }

  if (messageError) {
    return <div>Потише бричку, у нас ошибка {messageError}</div>
  }

  return (
    <>
      <Search />
      <div id="modalPushMessage"></div>
      {isPopup && (
        <Popup
          setIsPopup={setIsPopup}
          ids={ids}
          setMessageError={setMessageError}
        />
      )}
      <table className={table.table}>
        <thead>
          <tr
            className={table.titlesTable}
            onClick={(e) => onClickSort(e, setSearchParams, searchParams)}
          >
            <th>
              <div>
                <span style={{ width: "100%" }}>Имя</span>
                <img
                  className={
                    searchParams.get("Имя") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Фамилия</span>
                <img
                  className={
                    searchParams.get("Фамилия") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Отчество</span>
                <img
                  className={
                    searchParams.get("Отчество") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Верификация</span>
                <img
                  className={
                    searchParams.get("Верификация") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Бонусы</span>
                <img
                  className={
                    searchParams.get("Бонусы") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Сумма покупок</span>
                <img
                  className={
                    searchParams.get("Сумма покупок") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Общая сумма покупок</span>
                <img
                  className={
                    searchParams.get("Общая сумма покупок") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Количество визитов</span>
                <img
                  className={
                    searchParams.get("Количество визитов") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Общее количество визитов</span>
                <img
                  className={
                    searchParams.get("Общее количество визитов") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>
              <div>
                <span>Штрих-код электронной карты</span>
                <img
                  className={
                    searchParams.get("Штрих-код электронной карты") === "up"
                      ? table.titleArrowUp
                      : table.titleArrow
                  }
                  src={arrow as string}
                  alt="arrow"
                />
              </div>
            </th>
            <th>PUSH message</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .sort((a, b) => {
              if (searchParams.get("Бонусы") === "up") {
                return a.bonus > b.bonus ? -1 : 1
              }
              if (searchParams.get("Сумма покупок") === "up") {
                return a.bonus > b.bonus ? -1 : 1
              }
              if (searchParams.get("Общая сумма покупок") === "up") {
                return a.bonus > b.bonus ? -1 : 1
              }
              if (searchParams.get("Количество визитов") === "up") {
                return a.bonus > b.bonus ? -1 : 1
              }
              if (searchParams.get("Общее количество визитов") === "up") {
                return a.bonus > b.bonus ? -1 : 1
              }
              if (searchParams.get("Штрих-код электронной карты") === "up") {
                return a.bonus > b.bonus ? -1 : 1
              } else return a.bonus > b.bonus ? 1 : -1
            })
            .filter((customer) =>
              customer.last_name.includes(lastNameUrl as string)
            )
            .map((customer) => (
              <tr className={table.values} key={customer.id}>
                <th>{customer.first_name}</th>
                <th>{customer.last_name}</th>
                <th>{customer.pat_name}</th>
                <th>{String(customer.sms_verify)}</th>
                <th>{customer.bonus}</th>
                <th>{customer.summ}</th>
                <th>{customer.summ_all}</th>
                <th>{customer.visits}</th>
                <th>{customer.visits_all}</th>
                <th>{customer.barcode}</th>
                <th>
                  <input
                    type="checkbox"
                    onChange={(event) =>
                      onCheck(event, customer.id as number, setIds)
                    }
                  />
                </th>
              </tr>
            ))}
        </tbody>
        <tfoot className={table.tfoot}>
          <tr>
            <th>
              <button
                onClick={() => setIsPopup(true)}
                className={table.btnPush}
                disabled={!ids[0]}
              >
                PUSH
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
export default Customers
