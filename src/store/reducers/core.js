import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import defaultToast from '../../modules/Common/components/toast/defaultToast';
import LS from '../../services/localStorage';
import { apiLoginCheck, apiLoadUser } from '../thunk/core';

const initialState = {
  apiUrl: {
    instance: LS.get('core')?.instance || '',
    // protocol: LS.get('core')?.protocol || process.env.NODE_ENV === 'development' ? 'http' : 'https'
    protocol: LS.get('core')?.protocol ? LS.get('core')?.protocol : (process.env.NODE_END == 'development' ? 'http' : 'https')
  },
  user: {
    username: '',
    name: '',
    isLogged: false
  },
  connectionLoading: false
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setInstance: (state, action) => { state.apiUrl.instance = action.payload },
    setProtocol: (state, action) => { state.apiUrl.protocol = action.payload },
    setConnectionLoading: (state, action) => { state.connectionLoading = action.payload },
    insertUser: (state, action) => { state.user = action.payload },
    destroySession: (state) => { state.user = initialState.user }
  },
  extraReducers: (builder) => {
    /**
     * apiLoginCheck
     * Connexion de l'utilisateur
     */
    builder.addCase(apiLoginCheck.fulfilled, (state, action) => {
      toast.dismiss()
      toast.success('Vous êtes connecté !', defaultToast)

      const { data } = action.payload
      const { username, password } = action.meta.arg
      console.log('%c core.js #39 || data : ', 'background:red;color:#fff;font-weight:bold;', data);

      state.user = { username, name: data.data.name, isLogged: true }

      const json = {
        token: data.token,
        username,
        password,
        instance: state.apiUrl.instance,
        protocol: state.apiUrl.protocol
      }
      LS.set('core', json)
    })
    builder.addCase(apiLoginCheck.pending, () => {
      toast.loading('Connexion en cours ...', defaultToast)
    })
    builder.addCase(apiLoginCheck.rejected, (state, action) => {
      toast.dismiss()
      const { error } = action
      let msg;
      LS.clear()
      if (error?.response?.data?.message) {
        msg = error.response.data.message
      }
      msg = 'Une erreur de connexion est survenue'

      toast.error(msg, defaultToast)
    })

    /**
     * apiLoadUser
     * Récupération des données utilisateur
     */
    builder.addCase(apiLoadUser.fulfilled, (state, action) => {
      state.user = {
        username: action.payload.data.email,
        name: action.payload.data.name,
        isLogged: true
      }
      state.connectionLoading = false
    })
    builder.addCase(apiLoadUser.pending, (state) => {
      state.connectionLoading = true
    })
    builder.addCase(apiLoadUser.rejected, (state, action) => {
      state.connectionLoading = false
      LS.clear()
      state.user = initialState.user
    })
  }
})

// export const { actions: core } = coreSlice
export const {
  setInstance, setProtocol, insertUser, setConnectionLoading, destroySession
} = coreSlice.actions
export default coreSlice.reducer
