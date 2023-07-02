import { configureStore } from '@reduxjs/toolkit'
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux'
import counterReducer from './slices/counterSlice'
import signedinStateReducer from './slices/signedinStateSlice'
import userProfileReducer from './slices/userProfileSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signinStateSwitcher: signedinStateReducer,
    userProfileReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
