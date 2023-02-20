import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/type"

export const useAppDispatch = () => useDispatch<AppDispatch>()
