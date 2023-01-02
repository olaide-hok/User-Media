import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {faker} from '@faker-js/faker'

// Dev only!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
}

const albumsApi = createApi({
    reducerPath: 'albums',
    tagTypes: 'Album',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
        // FetchFn allows for overriding built-in fetch function
        fetchFn: async (...args) => {
            //Remove for production
            await pause(2000)
            return fetch(...args)
        },
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{type: 'Album', id: user.id}]
                },
                query: (user) => {
                    // user is a args/parameter for the useAddAlbumMutation hook i.e. useAddAlbumMutation(user)
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName(),
                        },
                    }
                },
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    return [{type: 'Album', id: user.id}]
                },
                // fetchAlbums automatically generates a useFetchAlbums hook
                query: (user) => {
                    // user args is what is passed into the useFetchAlbums hook i.e. useFetchAlbums(user)
                    return {
                        url: '/albums',
                        params: {
                            userId: user.id,
                        },
                        method: 'GET',
                    }
                },
            }),
        }
    },
})

export const {useFetchAlbumsQuery, useAddAlbumMutation} = albumsApi
export {albumsApi}
