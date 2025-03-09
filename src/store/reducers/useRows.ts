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
        newRow(state, action: PayloadAction<{ parentId: number | null; newChildRow: CurrentRowType }>) {
            const { parentId, newChildRow } = action.payload;
            const addRowToParent = (rows: CurrentRowType[]) => {
                for (const row of rows) {
                    if (row.id === parentId) {
                        row.child.push(newChildRow);
                        return true;
                    }
                    if (row.child && row.child.length > 0) {
                        const found = addRowToParent(row.child);
                        if (found) return true;
                    }
                }
                return false;
            };
            addRowToParent(state.rows);
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