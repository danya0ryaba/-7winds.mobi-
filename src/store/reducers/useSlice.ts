import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"
// @ts-ignore
export const fetchUsers = createAsyncThunk(
    '@@users/get-users',
    async (_, thunkApi) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const data = await response.json()
            return data
        } catch (e) {
            return thunkApi.rejectWithValue('Something wrent wrong')
        }
    }
)

export interface IUser {
    id: number
    name: string
    email: string
}

interface UserState {
    users: IUser[]
    isLoading: boolean
    error: string
}
const initialState: UserState = {
    users: [],
    isLoading: false,
    error: ''
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    // extraReducers: {
    //     [fetchUsers.fulfilled.type]: (state: any, action: PayloadAction<IUser[]>) => {
    //         state.isLoading = false
    //         state.error = ''
    //         state.users = action.payload
    //     },

    //     [fetchUsers.rejected.type]: (state: any, action: PayloadAction<string>) => {
    //         state.isLoading = false
    //         state.error = action.payload
    //     },

    //     [fetchUsers.pending.type]: (state: any) => {
    //         state.isLoading = true
    //     },
    // }
})

export default userSlice.reducer