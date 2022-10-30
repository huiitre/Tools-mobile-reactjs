import LS from '../../services/localStorage';
import core from '../__actions/__core';

const initialState = {
  apiUrl: {
    // instance: '',
    instance: LS.get('core')?.instance || '',
    protocol: LS.get('core')?.protocol || process.env.NODE_ENV === 'development' ? 'http' : 'https'
    // protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
  },
  user: {
    username: '',
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

    case core.SET_CONNECTION_LOADING: {
      return {
        ...state,
        connectionLoading: action.bool
      }
    }

    case core.DESTROY_SESSION: {
      return {
        ...state,
        user: initialState.user,
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
