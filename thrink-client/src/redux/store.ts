import { configureStore } from '@reduxjs/toolkit'
import { useSelector as rawUseSelector, TypedUseSelectorHook } from 'react-redux'
import signedinStateReducer from './slices/signedinStateSlice'
import userProfileReducer from './slices/userProfileSlice'
import userProfileMetaReducer from './slices/userProfileMetaSlice'
import selectedChatroomInfoReducer from './slices/selectedChatroomInfoSlice'

export const store = configureStore({
  reducer: {
    signinStateSwitcher: signedinStateReducer,
    userProfileReducer,
    userProfileMetaReducer,
    selectedChatroomInfoReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
