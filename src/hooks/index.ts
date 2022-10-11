import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"

export const selectUserState = (state: RootState) => state.user
export const selectUserData = (state: RootState) => state.user.userData
export const selectUsersState = (state: RootState) => state.users
export const selectProductsState = (state: RootState) => state.products
export const selectOrdersState = (state: RootState) => state.orders
export const selectBlogsState = (state: RootState) => state.blogs
export const selectPageContentState = (state: RootState) => state.pageContent.webPagesState

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

