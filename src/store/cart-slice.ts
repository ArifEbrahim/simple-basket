import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartState } from '../types/cart-state'
import ProductItem from '../types/product-item'

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  updated: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state,action:PayloadAction<CartState>) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addItemToCart(state, action: PayloadAction<ProductItem>) {
      state.totalQuantity++
      state.updated = true
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice += existingItem.price
      } else {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title
        })
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload
      const existingItem = state.items.find(item => item.id === id)
      if (!existingItem) return
      state.totalQuantity--
      state.updated = true
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    }
  }
})


export const { addItemToCart, removeItemFromCart, replaceCart } = cartSlice.actions

export default cartSlice
