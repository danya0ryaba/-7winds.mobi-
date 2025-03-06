import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CurrentRowType } from "../../types/types"

interface UserState {
    rows: CurrentRowType[]
    isLoading: boolean
    error: string
}

const initialState: UserState = {
    rows: [],
    isLoading: false,
    error: ''
}

export const rowsSlice = createSlice({
    name: 'rows',
    initialState,
    reducers: {
        setRows(state, action: PayloadAction<CurrentRowType[]>) {
            state.rows = action.payload;
        },
        newRow(state, action: PayloadAction<CurrentRowType>) {
            state.rows.push(action.payload);
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
})

export const { setRows, newRow, setLoading, setError } = rowsSlice.actions;
export default rowsSlice.reducer