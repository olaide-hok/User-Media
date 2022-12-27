import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {faker} from '@faker-js/faker'

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {
        return {
            addAlbum: builder.mutation({
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
