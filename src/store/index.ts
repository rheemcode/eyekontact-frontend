import { combineReducers, createSlice, configureStore, Reducer, AnyAction } from '@reduxjs/toolkit'
import userReducer from "../features/user/userSlice"
import usersReducer from "../features/users/usersSlice"
import productsReducer from "../features/products/productsSlice"
import ordersReducer from "../features/orders/ordersSlice"
import blogsReducer from "../features/blogs/blogSlice"
import cmsReducer from "../features/cms/cmsSlice"


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { AppStateMachine, HTTPCode } from '../Utils'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ["user"]

}

declare interface AppRootState {
  state: AppStateMachine;
  message: string,
  category: "blog" | "order" | "transaction" | "user" | "users" | "product" | "cms" | "none";
}

const rootInitialState: AppRootState = {
  state: AppStateMachine.Start,
  message: "",
  category: "none",
}

const rootSlice = createSlice({
  name: "root",
  initialState: rootInitialState,
  reducers: {}
})

const appReducer = combineReducers({
  root: rootSlice.reducer,
  user: userReducer,
  users: usersReducer,
  products: productsReducer,
  orders: ordersReducer,
  blogs: blogsReducer,
  pageContent: cmsReducer
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {


  if (action.payload) {
    state.root = rootInitialState;
    if (action.payload.code) {
      const httpCode: HTTPCode = action.payload.code;
      // if (httpCode === HTTPCode.OK) {
      //   console.log(state.root.state)
      //   state.root.state = AppStateMachine.Completed;
      //   state.root.message = action.payload.message;
      // }

      // else {
      //   state.root.state = AppStateMachine.Error;
      //   state.root.message = action.payload.message;
      // }

      // const actionType = action.type as string;
      // if (actionType.toLowerCase().includes("blog"))
      //   state.root.category = "blog";
      // else if (actionType.toLowerCase().includes("order"))
      //   state.root.category = "order";
      // else if (actionType.toLowerCase().includes("transaction"))
      //   state.root.category = "transaction";
      // else if (actionType.toLowerCase().includes("user"))
      //   state.root.category = "user";
      // else if (actionType.toLowerCase().includes("product"))
      //   state.root.category = "product";
      // else if (actionType.toLowerCase().includes("product"))
      //   state.root.category = "product";
      // else if (actionType.toLowerCase().includes("cmss"))
      //   state.root.category = "cms";

    }

    if (action.type == "userSlice/logoutUser") {
      storage.removeItem('persist:root');
      state = {} as RootState;
    }
  }
  return appReducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }),
}
)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch