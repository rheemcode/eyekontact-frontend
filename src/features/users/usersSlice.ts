import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Axios, AxiosResponse } from "axios";
import * as UserAPI from "../../api/user"
import App from "../../App";
import { AppStateMachine, HTTPCode } from "../../Utils";
import { ResponseData, UserData } from "../types";


interface SubsModel {
    email: string
}
declare interface UsersState {
    users: UserData[];
    subscribers: SubsModel[];
    state: AppStateMachine;
};

const initialState: UsersState = {
    users: [],
    subscribers: [],
    state: AppStateMachine.Start
}

export const usersSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(updateUserAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending
        })

        builder.addCase(addUserAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending
        })

        builder.addCase(deleteUserAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending
        })

        builder.addCase(updateUserAsync.rejected, (state, action) => {
            state.state = AppStateMachine.Error
        })

        builder.addCase(addUserAsync.rejected, (state, action) => {
            state.state = AppStateMachine.Error
        })

        builder.addCase(deleteUserAsync.rejected, (state, action) => {
            state.state = AppStateMachine.Error
        })

        //TODO: add error message modal

        builder.addCase(getSubscribersAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed;
            if (action.payload.code === HTTPCode.OK) {
                state.subscribers = action.payload.data as SubsModel[]
            }
        })

        builder.addCase(getUsersAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed
            if (action.payload.code === HTTPCode.OK)

                state.users = action.payload.data as UserData[];
        })

        builder.addCase(addUserAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed
            if (action.payload.code === HTTPCode.OK)

                state.users = action.payload.data as UserData[];
        })

        builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed

            if (action.payload.code === HTTPCode.OK)
                state.users = action.payload.data as UserData[];
        })

        builder.addCase(updateUserAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed

            if (action.payload.code == HTTPCode.OK) {
                const actionData = action.payload.data as UserData;
                state.users = state.users.map((userState) => {
                    if (userState.email == actionData.email)
                        return actionData;
                    return userState;
                })
                return;
            }
        })
    }
})

export const getSubscribersAsync = createAsyncThunk("subs", async () => {
    const response = await UserAPI.getSubs() as AxiosResponse<ResponseData>
    return response.data;
})


export const addUserAsync = createAsyncThunk('addUser', async (userData: UserData, thunkAPI) => {
    const response = await UserAPI.addUser(userData) as AxiosResponse<ResponseData>;
    return response.data;

})

export const updateUserAsync = createAsyncThunk('updateUser', async (userData: UserData) => {
    const response = await UserAPI.updateUser(userData) as AxiosResponse<ResponseData>
    return response.data;
});

export const getUsersAsync = createAsyncThunk('getUsers', async () => {
    const response = await UserAPI.getUsers() as AxiosResponse<ResponseData>
    return response.data;
})

export const deleteUserAsync = createAsyncThunk("deleteUser", async (userData: UserData) => {
    const response = await UserAPI.deleteUser(userData) as AxiosResponse<ResponseData>
    return response.data;
})

// export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default usersSlice.reducer;
