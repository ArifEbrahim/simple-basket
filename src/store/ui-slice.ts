import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Notification from '../types/notification'

type UIState = {
  isCartVisible: boolean
  notification: null | Notification
}

const initialState: UIState = {
  isCartVisible: false,
  notification: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible
    },
    showNotification(state, action: PayloadAction<Notification>) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message
      }
    }
  }
})

export const { toggleCart, showNotification } = uiSlice.actions

export default uiSlice
