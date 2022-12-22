import {createSlice} from '@reduxjs/toolkit'
import {fetchUsers} from '../thunks/fetchUsers'

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error: null,
    },
    // Watch for additonal action types/reducers that are not inherently tied to this slice.
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.error
        })
    },
})

export const usersReducer = usersSlice.reducer
