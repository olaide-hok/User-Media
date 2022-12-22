import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * fetchUsers automatically has three properties attached to it:
 * 1. fetchUsers.pending
 * 2. fetchUsers.fulfilled
 * 3. fetchUsers.rejected
 */
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users')
    return response.data
})

export {fetchUsers}
