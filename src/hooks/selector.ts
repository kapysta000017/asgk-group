import { useSelector, TypedUseSelectorHook } from "react-redux"
import { RootState } from "../store/type"

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
