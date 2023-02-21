import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit"
import axios from "axios"
import getCookie from "../logic/cookie/getCookie"
import { RootState } from "./typeIndex"
import { CustomersType } from "./typeCustomers"

const adapter = createEntityAdapter()
const initialState = adapter.getInitialState()

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
      console.log(message)
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
      const arrayCustomers = action.payload.passes as Array<CustomersType>
      arrayCustomers.forEach((customer: CustomersType) => {
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
      console.log(arrayCustomers)
      adapter.setAll(state, arrayCustomers)
    })
  },
})

export default slice.reducer
export const { selectAll: selectCustomers, selectById: selectCustomer } =
  adapter.getSelectors((state: RootState) => state.customers)
