import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = { baseUrl: 'http://185.244.172.108:8081/v1/outlay-rows/entity/148575/' }

// @ts-ignore
export const rowsApi = createApi({
    reducerPath: 'rowsApi',
    // tagTypes: ['Rows'],
    baseQuery: fetchBaseQuery(BASE_URL),
    endpoints: (builder) => ({
        getRows: builder.query({
            query: () => 'row/list',
        }),


        // getCardId: builder.query<CardRequestType, string>({
        //     query: (id) => `/items/${id}`,
        //     providesTags: (_, __, id) => [{ type: 'Card', id }],
        // }),
        // createCard: builder.mutation<CardRequestType, CardRequestTypeWithoutId>({
        //     query: body => ({
        //         url: '/items',
        //         method: 'POST',
        //         body: { ...body }
        //     }),
        //     invalidatesTags: [{ type: 'Card', id: 'LIST' }],
        // }),
        // updateCard: builder.mutation<CardRequestType, { id: string; body: CardRequestTypeWithoutId }>({
        //     query: ({ id, body }) => ({
        //         url: `/items/${id}`,
        //         method: 'PUT',
        //         body: {
        //             ...body
        //         }
        //     }),
        //     invalidatesTags: (_, __, { id }) => [{ type: 'Card', id }],
        // })


    }),
})

export const { useGetRowsQuery } = rowsApi