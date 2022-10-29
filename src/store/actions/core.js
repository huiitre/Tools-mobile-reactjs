const core = {
  //* ACTION TYPE API_LOGIN_CHECK
  API_LOGIN_CHECK: 'API_LOGIN_CHECK',
  //* ACTION CREATOR apiLoginCheck
  apiLoginCheck: (payload) => ({
    type: core.API_LOGIN_CHECK,
    credentials: payload
  }),

  //* ACTION TYPE API_LOAD_USER
  API_LOAD_USER: 'API_LOAD_USER',
  //* ACTION CREATOR apiLoadUser
  apiLoadUser: () => ({
    type: core.API_LOAD_USER,
  }),

  //* ACTION TYPE SET_CONNECTION_LOADING
  SET_CONNECTION_LOADING: 'SET_CONNECTION_LOADING',
  //* ACTION CREATOR setConnectionLoading
  setConnectionLoading: (bool) => ({
    type: core.SET_CONNECTION_LOADING,
    bool
  }),

  //* ACTION TYPE INSERT_USER
  INSERT_USER: 'INSERT_USER',
  //* ACTION CREATOR insertUser
  insertUser: (payload) => ({
    type: core.INSERT_USER,
    payload
  }),

  //* ACTION TYPE SET_API_URL
  SET_API_URL: 'SET_API_URL',
  //* ACTION CREATOR setApiUrl
  setApiUrl: (payload) => ({
    type: core.SET_API_URL,
    payload
  }),

  //* ACTION TYPE INSERT_LOCAL_STORAGE
  INSERT_LOCAL_STORAGE: 'INSERT_LOCAL_STORAGE',
  //* ACTION CREATOR insertLocalStorage
  insertLocalStorage: (payload) => ({
    type: core.INSERT_LOCAL_STORAGE,
    payload
  }),

  //* ACTION TYPE DESTROY_SESSION
  DESTROY_SESSION: 'DESTROY_SESSION',
  //* ACTION CREATOR destroySession
  destroySession: () => ({
    type: core.DESTROY_SESSION,
  }),

  //* ACTION TYPE SET_USERNAME
  SET_USERNAME: 'SET_USERNAME',
  //* ACTION CREATOR setUsername
  setUsername: (username) => ({
    type: core.SET_USERNAME,
    username
  }),

  //* ACTION TYPE SET_PASSWORD
  SET_PASSWORD: 'SET_PASSWORD',
  //* ACTION CREATOR setPassword
  setPassword: (password) => ({
    type: core.SET_PASSWORD,
    password
  }),

  //* ACTION TYPE SET_INSTANCE
  SET_INSTANCE: 'SET_INSTANCE',
  //* ACTION CREATOR setInstance
  setInstance: (instance) => ({
    type: core.SET_INSTANCE,
    instance
  }),

  //* ACTION TYPE SET_PROTOCOL
  SET_PROTOCOL: 'SET_PROTOCOL',
  //* ACTION CREATOR setProtocol
  setProtocol: (protocol) => ({
    type: core.SET_PROTOCOL,
    protocol
  }),

}

export default core
