import _ from 'lodash';

const promiseMiddleware = (store: any) => (next: any) => (action: any) => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      (res: any) => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res;
        store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        store.dispatch(action);
      },
      (error: any) => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.error = true;
        action.payload = _.get(error, 'response.body');
        if (!action.skipTracking) {
          store.dispatch({ type: 'ASYNC_END', promise: action.payload });
        }
        store.dispatch(action);
      }
    );
    return;
  }
  next(action);
};

function isPromise(v: any) {
  return v && typeof v.then === 'function';
}

export { promiseMiddleware };