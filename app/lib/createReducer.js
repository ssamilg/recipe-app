import produce from 'immer';

export default function createReducer(initialState, handlers) {
  return produce((draft, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](draft, action);
    }
  }, initialState);
}
