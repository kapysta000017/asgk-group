import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/typeIndex"

export const useAppDispatch = () => useDispatch<AppDispatch>()
