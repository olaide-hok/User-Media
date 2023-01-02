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
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{type: 'Album', id: album.id}]
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    }
                },
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{type: 'UsersAlbums', id: user.id}]
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
                    const tags = result.map((album) => {
                        return {type: 'Album', id: album.id}
                    })
                    tags.push({type: 'UsersAlbums', id: user.id})
                    return tags
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

export const {
    useFetchAlbumsQuery,
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} = albumsApi
export {albumsApi}
