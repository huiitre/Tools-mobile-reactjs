import { configureStore } from '@reduxjs/toolkit';
import coreReducer from './reducers/core'

const store = configureStore({
  reducer: {
    core: coreReducer
  }
})

export default store;
