import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import * as BlogAPI from "../../api/blogs"
import { AppStateMachine, HTTPCode } from "../../Utils";
import { BlogData, ResponseData } from "../types";

declare interface BlogsState {
    blogs: BlogData[];
    addState: AppStateMachine;
    deleteState: AppStateMachine;
    updateState: AppStateMachine;
    getState: AppStateMachine;
};

const initialState: BlogsState = {
    blogs: [],
    addState: AppStateMachine.Start,
    updateState: AppStateMachine.Start,
    deleteState: AppStateMachine.Start,
    getState: AppStateMachine.Start,
}

export const blogSlice = createSlice({
    name: 'blogSlice',
    initialState,
    reducers: {
        setUpdateState: (state, action: PayloadAction<AppStateMachine>) => {
            state.updateState = action.payload
        },

        setAddState: (state, action: PayloadAction<AppStateMachine>) => {
            state.addState = action.payload;
        },

        setGetState: (state, action: PayloadAction<AppStateMachine>) => {
            state.getState = action.payload;
        },

        setDeleteState: (state, action: PayloadAction<AppStateMachine>) => {
            state.deleteState = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBlogAsync.pending, (state, action) => {
            state.addState = AppStateMachine.Pending;
        });

        builder.addCase(addBlogAsync.rejected, (state, action) => {
            state.addState = AppStateMachine.Error;
        });

        builder.addCase(addBlogAsync.fulfilled, (state, action) => {
            state.addState = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                state.blogs.push(action.payload.data as BlogData);
                state.addState = AppStateMachine.Completed;

            }
        })

        builder.addCase(getBlogsAsync.pending, (state, action) => {
            state.getState = AppStateMachine.Pending;
        });

        builder.addCase(getBlogsAsync.rejected, (state, action) => {
            state.getState = AppStateMachine.Error;
        });

        builder.addCase(getBlogsAsync.fulfilled, (state, action) => {
            state.getState = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                state.blogs = action.payload.data as BlogData[];
                state.getState = AppStateMachine.Completed;
            }

        });

        builder.addCase(deleteBlogAsync.pending, (state, action) => {
            state.deleteState = AppStateMachine.Pending;
        });

        builder.addCase(deleteBlogAsync.rejected, (state, action) => {
            state.deleteState = AppStateMachine.Error;
        });

        builder.addCase(deleteBlogAsync.fulfilled, (state, action) => {
            state.deleteState = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                state.blogs = action.payload.data as BlogData[];
                state.deleteState = AppStateMachine.Completed;

            }

        });

        builder.addCase(updateBlogAsync.pending, (state, action) => {
            state.updateState = AppStateMachine.Pending;
        });

        builder.addCase(updateBlogAsync.rejected, (state, action) => {
            state.updateState = AppStateMachine.Error;
        });

        builder.addCase(updateBlogAsync.fulfilled, (state, action) => {
            state.updateState = AppStateMachine.Error;

            if (action.payload.code == HTTPCode.OK) {
                const actionData = action.payload.data as BlogData;
                state.updateState = AppStateMachine.Completed;
                state.blogs = state.blogs.map((blogState) => {
                    if (blogState.blogid == actionData.blogid)
                        return actionData;
                    return blogState;
                })
                return;
            }
        })
    }
})


export const addBlogAsync = createAsyncThunk('addBlog', async (blogData: BlogData) => {
    const response = await BlogAPI.addBlog(blogData) as AxiosResponse<ResponseData>;
    return response.data;

})

export const updateBlogAsync = createAsyncThunk('updateBlog', async (blogData: BlogData) => {
    const response = await BlogAPI.updateBlog(blogData) as AxiosResponse<ResponseData>
    return response.data;
});

export const getBlogsAsync = createAsyncThunk('getBlogs', async () => {
    const response = await BlogAPI.getBlogs() as AxiosResponse<ResponseData>
    return response.data;
})

export const deleteBlogAsync = createAsyncThunk('deleteBlog', async (blogData: BlogData) => {
    const response = await BlogAPI.deleteBlog(blogData) as AxiosResponse<ResponseData>
    return response.data;
})

// export const { registerUser, loginUser, logoutUser } = userSlice.actions;

export default blogSlice.reducer;
