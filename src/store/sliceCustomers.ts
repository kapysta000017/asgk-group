import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import axios from "axios"
import getCookie from "../logic/cookie/getCookie"
import { RootState } from "./typeIndex"
import { CustomerType } from "./../interface"

const adapter = createEntityAdapter()
const initialState = adapter.getInitialState({
  sortCustomerBonus: [] as Array<CustomerType>,
  sortCustomerSumm: [] as Array<CustomerType>,
  sortCustomerSummAll: [] as Array<CustomerType>,
  sortCustomerVisits: [] as Array<CustomerType>,
  sortCustomerVisitsAll: [] as Array<CustomerType>,
  sortCustomerBarcode: [] as Array<CustomerType>,
})

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(
        `https://api.asgk-group.ru/v1/${getCookie("forRequest")}/passes`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: getCookie("singIn"),
          },
        }
      )
      return response.data
    } catch (error) {
      const e = error as Error
      const message = e.message
      return rejectWithValue(message)
    }
  }
)

const slice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      const arrayCustomers = action.payload.passes as Array<CustomerType>
      arrayCustomers.forEach((customer: CustomerType) => {
        Object.defineProperty(
          customer,
          "id",
          Object.getOwnPropertyDescriptor(
            customer,
            "user_id"
          ) as PropertyDescriptor
        )
        delete customer["user_id"]
      })
      adapter.setAll(state, arrayCustomers)
      state.sortCustomerBonus = arrayCustomers.sort((a, b) =>
        a.bonus > b.bonus ? -1 : 1
      )
    })
  },
})

export default slice.reducer
export const { selectAll: selectCustomers, selectById: selectCustomer } =
  adapter.getSelectors((state: RootState) => state.customers)
