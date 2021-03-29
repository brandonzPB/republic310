import { useReducer, useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import * as types from './types';

export const useLocalStorageReducer = (LOCAL_STORAGE_KEY: string, INITIAL_STATE: any, reducer: types.Reducer) => {
  const [savedState, saveState] = useLocalStorage(LOCAL_STORAGE_KEY, INITIAL_STATE);

  const reducerCallback: any = useCallback(
    (state: any, action: any) => {
      const newState: any = reducer(state, action);

      saveState(newState);

      return newState;
    },
    [saveState],
  )

  return useReducer(reducerCallback, savedState);
}