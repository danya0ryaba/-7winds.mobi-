import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rowsReducer from './reducers/useRows'
import { rowsApi } from './API/rowsApi'

export const rootReducer = combineReducers({
    rowsReducer,
    [rowsApi.reducerPath]: rowsApi.reducer
})

export const setupStore = () => {
    return configureStore(
        {
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rowsApi.middleware)
        }
    )
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']