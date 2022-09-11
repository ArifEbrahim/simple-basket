import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  isCartVisible: boolean
}

const initialState: UIState = {
  isCartVisible: false
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartVisible = !state.isCartVisible
    }
  }
})

export const { toggleCart } = uiSlice.actions

export default uiSlice
