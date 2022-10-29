import axios from 'axios';
import core from '../store/actions/core';
import store from '../store/store';

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
})

client.interceptors.request.use((config) => {
  //* Gestion du token Bearer
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  } else {
    config.headers.authorization = ''
  }

  //* Gestion de l'url API
  const inst = localStorage.getItem('instance')
  const proto = localStorage.getItem('protocol')

  if (inst && proto) {
    store.dispatch(core.setInstance(inst))
    store.dispatch(core.setProtocol(proto))
  }

  const { instance, protocol } = store.getState().core.apiUrl
  config.baseURL = `${protocol}://${instance}/api`
  return config
})

export default client
