import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as ProductAPI from "../../api/products"
import { AppStateMachine, HTTPCode } from "../../Utils";
import { ProductData, ResponseData, UserData } from "../types";

declare interface ProductsState {
    products: ProductData[];
    state: AppStateMachine;
};

const initialState: ProductsState = {
    products: [],
    state: AppStateMachine.Start,
}

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState,
    reducers: {
        // setstate: (state, action: PayloadAction<AppStateMachine>) => {
        //     state.state = action.payload
        // },

        // setstate: (state, action: PayloadAction<AppStateMachine>) => {
        //     state.state = action.payload;
        // },

        // setstate: (state, action: PayloadAction<AppStateMachine>) => {
        //     state.state = action.payload;
        // },

        // setstate: (state, action: PayloadAction<AppStateMachine>) => {
        //     state.state = action.payload;
        // },
    },

    extraReducers: (builder) => {
        builder.addCase(addProductAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending;
        })

        builder.addCase(addProductAsync.rejected, (state, action) => {
            state.state = AppStateMachine.Error;
        })

        builder.addCase(addProductAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                state.products.push(action.payload.data as ProductData);
                state.state = AppStateMachine.Completed;
            }
        })

        builder.addCase(getProductsAsync.fulfilled, (state, action) => {

            state.state = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                state.products = action.payload.data as ProductData[];
                state.state = AppStateMachine.Completed;
            }
        });

        builder.addCase(getProductsAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending;
        });

        builder.addCase(getProductsAsync.rejected, (state, action) => {
            state.state = AppStateMachine.Error;
        });

        builder.addCase(deleteProductAsync.fulfilled, (state, action) => {

            state.state = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                const productid = action.payload.data as string;
                console.log(productid);
                state.products = state.products.filter((val) => val.productid != productid)
                state.state = AppStateMachine.Completed;
            }
        })

        builder.addCase(updateProductAsync.fulfilled, (state, action) => {
            state.state = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                state.state = AppStateMachine.Completed;
                const actionData = action.payload.data as ProductData;
                const actionDataOld = action.payload.dataOld as ProductData;

                state.products = state.products.map((productState) => {
                    if (productState.productname == actionDataOld.productname && productState.productcategory == actionDataOld.productcategory && productState.productprice == actionDataOld.productprice)
                        return actionData;
                    return productState;
                })
            }
        })

        builder.addCase(updateProductAsync.pending, (state, action) => {
            state.state = AppStateMachine.Pending;
        });

        builder.addCase(updateProductAsync.rejected, (state, action) => {
            state.state = AppStateMachine.Error;
        })
    }
})


export const addProductAsync = createAsyncThunk('addProduct', async (productData: ProductData) => {
    const response = await ProductAPI.addProduct(productData) as AxiosResponse<ResponseData>;
    return response.data;

})

export const updateProductAsync = createAsyncThunk('updateProduct', async (productData: { product: ProductData, productOld: ProductData }) => {
    const response = await ProductAPI.updateProduct(productData) as AxiosResponse<ResponseData>
    return response.data;
});

export const getProductsAsync = createAsyncThunk('getProducts', async () => {
    const response = await ProductAPI.getProducts() as AxiosResponse<ResponseData>
    return response.data;
})

export const deleteProductAsync = createAsyncThunk('deleteProduct', async (productData: ProductData) => {
    const response = await ProductAPI.deleteProduct(productData) as AxiosResponse<ResponseData>
    return response.data;
})

// export const { setstate, setstate, setstate, setstate } = productsSlice.actions;
// export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default productsSlice.reducer;
