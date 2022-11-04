import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../services/axiosInstance';

export const apiLoginCheck = createAsyncThunk('core/login_check',
  async (credentials, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await client.post('/login_check', credentials)
      return fulfillWithValue(res)
    } catch (error) {
      return rejectWithValue(error)
    }
  })

export const apiLoadUser = createAsyncThunk('core/loadUser',
  async () => {
    const res = await client.get('/user/profile')
    return res
  })
