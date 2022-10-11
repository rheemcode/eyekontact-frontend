import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as UserAPI from "../../api/user"
import { AppStateMachine, HTTPCode } from "../../Utils";
import { ResponseData, UserData } from "../types";

declare interface UserState {
    userData: UserData;
    isLogin: boolean;
    registerState: AppStateMachine;
    loginState: AppStateMachine;
};

const initialState: UserState = {
    userData: {
        userid: "",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        role: "",
        password: ""
    },

    isLogin: false,
    loginState: AppStateMachine.Start,
    registerState: AppStateMachine.Start
}

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        registerUser: (state) => {

        },
        loginUser: (state, action: PayloadAction<UserState>) => {

        },

        logoutUser: (state) => {
            state.userData = initialState.userData;
            state.isLogin = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUserAsync.pending, (state, action) => {
            state.registerState = AppStateMachine.Pending
        })

        builder.addCase(registerUserAsync.rejected, (state, action) => {
            state.registerState = AppStateMachine.Error
        })

        builder.addCase(registerUserAsync.fulfilled, (state, action) => {
            state.registerState = AppStateMachine.Error;
            if (action.payload.code == HTTPCode.OK)
                state.registerState = AppStateMachine.Completed;
        });

        builder.addCase(loginUserAsync.pending, (state, action) => {
            state.loginState = AppStateMachine.Pending
        })

        builder.addCase(loginUserAsync.rejected, (state, action) => {
            state.loginState = AppStateMachine.Error
        })

        builder.addCase(loginUserAsync.fulfilled, (state, action) => {
            state.loginState = AppStateMachine.Error;
            if (action.payload.code == HTTPCode.OK) {
                state.loginState = AppStateMachine.Completed;
                state.userData = action.payload.data as UserData;
                state.isLogin = true;
                return;
            }

            state.isLogin = false;
            state.userData = initialState.userData;
        })


    }
})

export const loginUserAsync = createAsyncThunk('loginUser', async (userData: UserData) => {
    const response = await UserAPI.loginUser(userData) as AxiosResponse<ResponseData>
    return response.data;
})

export const registerUserAsync = createAsyncThunk('registerUser', async (userData: UserData, thunkAPI) => {
    const response = await UserAPI.registerUser(userData) as AxiosResponse<ResponseData>;
    return response.data;

});


export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
