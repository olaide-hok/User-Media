import React from 'react'
import {useFetchAlbumsQuery} from '../store'

const AlbumsList = ({user}) => {
    const {data, error, isLoading} = useFetchAlbumsQuery(user)
    return <div>Albums for {user.name}</div>
}

export default AlbumsList
