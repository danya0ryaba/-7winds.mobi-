import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RequestBodyType, ResponseBodyType, CurrentRowType, UpdateRequestBodyType } from '../../types/types';

const apiUrl = import.meta.env.VITE_BASE_URL;
const eId = import.meta.env.VITE_E_ID;

export const BASE_URL = { baseUrl: apiUrl };

export const rowsApi = createApi({
    reducerPath: 'rowsApi',
    baseQuery: fetchBaseQuery(BASE_URL),
    tagTypes: ['Row'],
    endpoints: (builder) => ({
        getRows: builder.query<CurrentRowType[], void>({
            query: () => `${eId}/row/list`,
            providesTags: (result) =>
                result ?
                    [...result.map(({ id }) => ({ type: 'Row' as const, id })), { type: 'Row', id: 'LIST' }]
                    : [{ type: 'Row', id: 'LIST' }],
        }),
        createRow: builder.mutation<ResponseBodyType, RequestBodyType>({
            query: (body) => ({
                url: `${eId}/row/create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Row', id: 'LIST' }],
        }),
        updateRow: builder.mutation<ResponseBodyType, UpdateRequestBodyType>({
            query: ({ rId, body }) => ({
                url: `${eId}/row/${rId}/update`,
                method: 'POST',
                body,
            }),
            invalidatesTags: (_, __, { rId }) => [{ type: 'Row', id: rId }],
        }),
        deleteRow: builder.mutation<ResponseBodyType, number>({
            query: (rId) => ({
                url: `${eId}/row/${rId}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Row', id: 'LIST' }], // Указываем, что после удаления строки нужно обновить список
        }),
    }),
});

export const { useGetRowsQuery, useCreateRowMutation, useUpdateRowMutation, useDeleteRowMutation } = rowsApi;
