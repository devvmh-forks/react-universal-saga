import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import { DevTools } from 'containers';
import rootReducer from '../reducers';

import { crudSaga, ApiClient } from 'redux-crud-store';

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const client = new ApiClient({ basePath: 'http://github.com/api/v3/' });
  const crudMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        crudMiddleware,
        createLogger()
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      //eslint-disable-next-line
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.crudSaga = crudSaga(client);
  store.close = () => store.dispatch(END);
  return store;
}
