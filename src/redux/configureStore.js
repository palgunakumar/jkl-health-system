import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggerMiddleware from '../middleware/logger';
import monitorReducersEnhancer from '../enhancers/monitorReducer'; // Optional for monitoring reducers
import rootReducer from '../reducers';
import { env } from '../reducers/Types';  // Ensure 'env' is correctly defined

export default function configureStore(preloadedState) {
  // Array of middlewares
  const middlewares = [ThunkMiddleware];

  // Add logger middleware in development mode
  if (env !== 'production') {
    middlewares.push(loggerMiddleware);
  }

  // Apply middlewares
  const middlewareEnhancer = applyMiddleware(...middlewares);

  // Add enhancer for monitoring reducers in non-production environments
  const enhancers = [middlewareEnhancer];
  if (env !== 'production') {
    enhancers.push(monitorReducersEnhancer);
  }

  // Create the store with the rootReducer, preloadedState, and enhancers
  const store = createStore(rootReducer, preloadedState, ...enhancers);

  // Enable hot module replacement for reducers in development
  if (env !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}
