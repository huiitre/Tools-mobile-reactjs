import core from '../actions/core';

const initialState = {
  apiUrl: {
    instance: '',
    protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
  },
  user: {
    username: '',
    password: '',
    name: '',
    isLogged: false
  },
  connectionLoading: false
};

const coreReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case core.INSERT_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    }

    case core.INSERT_LOCAL_STORAGE: {
      const keys = Object.keys(action.payload)
      for (const val of keys) {
        localStorage.setItem(val, action.payload[val])
      }
      return {
        ...state
      }
    }

    case core.SET_CONNECTION_LOADING: {
      return {
        ...state,
        connectionLoading: action.bool
      }
    }

    case core.DESTROY_SESSION: {
      localStorage.clear()
      return {
        ...state,
        user: {
          ...state.user,
          username: '',
          password: '',
          name: '',
          isLogged: false
        },
      }
    }

    case core.SET_USERNAME: {
      return {
        ...state,
        user: {
          ...state.user,
          username: action.username
        }
      }
    }

    case core.SET_PASSWORD: {
      return {
        ...state,
        user: {
          ...state.user,
          password: action.password
        }
      }
    }

    case core.SET_INSTANCE: {
      return {
        ...state,
        apiUrl: {
          ...state.apiUrl,
          instance: action.instance
        }
      }
    }

    case core.SET_PROTOCOL: {
      return {
        ...state,
        apiUrl: {
          ...state.apiUrl,
          protocol: action.protocol
        }
      }
    }

    default:
      return state;
  }
};

export default coreReducer;
