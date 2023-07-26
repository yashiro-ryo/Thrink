import { configureStore } from '@reduxjs/toolkit'
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux'
import counterReducer from './slices/counterSlice'
import signedinStateReducer from './slices/signedinStateSlice'
import userProfileReducer from './slices/userProfileSlice'
import userProfileMetaReducer from './slices/userProfileMetaSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signinStateSwitcher: signedinStateReducer,
    userProfileReducer,
    userProfileMetaReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
