const {
  compose,
  applyMiddleware,
  createStore,
  combineReducers
} = require('redux');
const { default: userMiddleware } = require('./middlewares/user');
const { default: coreReducer } = require('./reducers/core')

const rootReducer = combineReducers({
  user: coreReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  userMiddleware,
];

const enhancers = composeEnhancers(
  applyMiddleware(...middlewares)
);

const store = createStore(rootReducer, enhancers);

export default store;
