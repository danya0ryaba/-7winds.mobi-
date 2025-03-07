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
                        row.child.push(newChildRow); // Добавляем новый Row в child родительского Row
                        return true; // Успешно добавлено
                    }
                    if (row.child && row.child.length > 0) {
                        const found = addRowToParent(row.child);
                        if (found) return true; // Если добавлено в дочерние элементы
                    }
                }
                return false; // Если не найден родитель
            };
            addRowToParent(state.rows); // Запускаем рекурсивную функцию
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    },
})

// Рекурсивная функция для поиска строки по id

const findRowById = (rows: CurrentRowType[] | [null], id: number): CurrentRowType | undefined => {
    if (!rows[0]) return undefined
    for (const row of rows) {
        if (row!.id === id) {
            return row ?? undefined; // Возвращаем найденную строку
        }
        if (row!.child && row!.child.length > 0) {
            const found = findRowById(row!.child, id);
            if (found) {
                return found; // Если нашли в дочерних элементах
            }
        }
    }
    return undefined; // Если не нашли
};

// Селектор для получения строки по id
export const selectRowById = (state: UserState, id: number): CurrentRowType | undefined => {
    return findRowById(state.rows, id);
};

export const { setRows, newRow, setLoading, setError } = rowsSlice.actions;
export default rowsSlice.reducer