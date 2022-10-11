import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as OrderAPI from "../../api/orders"
import { AppStateMachine, HTTPCode } from "../../Utils";
import { OrderData, ResponseData } from "../types";

declare interface OrdersState {
    orders: OrderData[];
    state: AppStateMachine
};

const initialState: OrdersState = {
    orders: [],
    state: AppStateMachine.Start

}

export const ordersSlice = createSlice({
    name: 'ordersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder.addCase(addOrderAsync.pending, (state, action) => {
        //     state.state = AppStateMachine.Pending

        // })

        // builder.addCase(getOrdersAsync.pending, (state, action) => {
        //     state.state = AppStateMachine.Pending

        // })

        builder.addCase(deleteOrderAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending

        })

        builder.addCase(updateOrderAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending
        })

        builder.addCase(addOrderAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending

        })

        builder.addCase(addOrderAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed;
        })

        builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed;

            if (action.payload.code == HTTPCode.OK)
                state.orders = action.payload.data as OrderData[];

        })

        builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed;

            if (action.payload.code == HTTPCode.OK)
                state.orders = action.payload.data as OrderData[];

        })

        builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Completed;

            if (action.payload.code == HTTPCode.OK) {
                const actionData = action.payload.data as OrderData;

                state.orders = state.orders.map((orderState) => {
                    if (orderState.orderid == actionData.orderid)
                        return actionData;
                    return orderState;
                })
                return;
            }
        })
    }
})


export const addOrderAsync = createAsyncThunk('addOrder', async (orderData: OrderData) => {
    const response = await OrderAPI.addOrder(orderData) as AxiosResponse<ResponseData>;
    return response.data;

})

export const updateOrderAsync = createAsyncThunk('updateOrder', async (orderData: OrderData) => {
    const response = await OrderAPI.updateOrder(orderData) as AxiosResponse<ResponseData>
    return response.data;
});

export const getOrdersAsync = createAsyncThunk('getOrders', async () => {
    const response = await OrderAPI.getOrders() as AxiosResponse<ResponseData>
    return response.data;
})

export const deleteOrderAsync = createAsyncThunk('deleteOrder', async (orderData: OrderData) => {
    const response = await OrderAPI.deleteOrder(orderData) as AxiosResponse<ResponseData>
    return response.data;
})

// export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default ordersSlice.reducer;
