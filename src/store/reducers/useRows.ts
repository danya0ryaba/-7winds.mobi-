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
        // убрать any!
        newRow(state, action: PayloadAction<{ parentId: number; newChildRow: CurrentRowType }>) {
            const { parentId, newChildRow } = action.payload;
            const addRowToParent = (rows: any[]) => {
                for (const row of rows) {
                    if (row.id === parentId) {
                        row.child.push(newChildRow); // Добавляю новый Row в child родительского Row
                        return true; // Успешно добавлено
                    }
                    if (row.child && row.child.length > 0) {
                        const found = addRowToParent(row.child);
                        if (found) return true; // Если добавлено в дочерние элементы
                    }
                }
                return false; // Если не найден родитель
            };
            addRowToParent(state.rows); // рекурсивно вызываю функцию
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