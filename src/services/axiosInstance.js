import axios from 'axios';
import { toast } from 'react-toastify';
import { defaultToast } from '../modules/Common/components/toast/toasts';
import store from '../store/store';
import LS from './localStorage';

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
})

client.interceptors.request.use((config) => {
  //* Gestion du token Bearer
  const coreObj = LS.get('core')
  if (coreObj?.token) {
    config.headers.authorization = `Bearer ${coreObj?.token}`
  } else {
    config.headers.authorization = ''
  }

  const { instance, protocol } = store.getState().core.apiUrl
  config.baseURL = `${protocol}://${instance}/api`
  return config
})

client.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error?.response?.status === 500)
    toast.error('Une erreur serveur est survenue', defaultToast())
  return Promise.reject(error)
})

export default client
