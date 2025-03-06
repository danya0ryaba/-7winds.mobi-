import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RequestBodyType, ResponseBodyType, RowType, UpdateRequestBodyType } from '../../types/types'

const apiUrl = import.meta.env.VITE_BASE_URL;
const eId = import.meta.env.VITE_E_ID;

export const BASE_URL = { baseUrl: apiUrl }

export const rowsApi = createApi({
    reducerPath: 'rowsApi',
    baseQuery: fetchBaseQuery(BASE_URL),
    endpoints: (builder) => ({
        getRows: builder.query<RowType[], void>({
            query: () => `${eId}/row/list`,
        }),

        createRow: builder.mutation<ResponseBodyType, RequestBodyType>({
            query: body => ({
                url: `${eId}/row/create`,
                method: 'POST',
                body,
            })
        }),

        updateRow: builder.mutation<ResponseBodyType, UpdateRequestBodyType>({
            query: ({ rId, body }) => ({
                url: `${eId}/row/${rId}/update`,
                method: 'POST',
                body,
            })
        }),

        deleteRow: builder.mutation<ResponseBodyType, number>({
            query: (rId) => ({
                url: `${eId}/row/${rId}/delete`,
                method: 'DELETE',
            })
        }),

    }),
})

export const { useGetRowsQuery, useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } = rowsApi