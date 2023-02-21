import { configureStore } from "@reduxjs/toolkit"
import sliceCustomers from "./sliceCustomers"

export default configureStore({
  reducer: {
    customers: sliceCustomers,
  },
})
