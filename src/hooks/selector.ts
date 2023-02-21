import { useSelector, TypedUseSelectorHook } from "react-redux"
import { RootState } from "../store/typeIndex"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
