import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../services/axiosInstance';

export const apiLoginCheck = createAsyncThunk('core/login_check',
  async (credentials) => {
    const res = await client.post('/login_check', credentials)
    return res
  })

export const apiLoadUser = createAsyncThunk('core/loadUser',
  async () => {
    const res = await client.get('/user/profile')
    return res
  })
