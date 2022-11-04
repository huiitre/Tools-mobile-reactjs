import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { defaultToast } from '../../modules/Common/components/toast/toasts';
import LS from '../../services/localStorage';
import { apiLoginCheck, apiLoadUser } from '../thunk/core';

const initialState = {
  apiUrl: {
    instance: LS.get('core')?.instance ? LS.get('core')?.instance : (process.env.NODE_ENV == 'development' ? 'localhost:5050' : 'api.tools.huiitre.fr'),
    // protocol: LS.get('core')?.protocol || process.env.NODE_ENV === 'development' ? 'http' : 'https'
    protocol: LS.get('core')?.protocol ? LS.get('core')?.protocol : (process.env.NODE_ENV == 'development' ? 'http' : 'https')
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
      toast.dismiss('loading-login_check')
      toast.success('Vous êtes connecté !', defaultToast())

      const { data } = action.payload
      const { username, password } = action.meta.arg

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
      toast.loading('Connexion en cours ...', defaultToast('loading-login_check'))
    })
    builder.addCase(apiLoginCheck.rejected, (state, action) => {
      console.log('%c core.js #58 || rejected : ', 'background:red;color:#fff;font-weight:bold;', action);
      toast.dismiss('loading-login_check')
      const { payload } = action
      let msg;
      LS.clear()
      if (payload?.response?.data?.message) {
        msg = payload.response.data.message
      }

      toast.error(msg, defaultToast())
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
    builder.addCase(apiLoadUser.rejected, (state) => {
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
