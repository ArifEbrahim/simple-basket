import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CartItem from '../types/cart-item'
import ProductItem from '../types/product-item'

type CartState = {
  items: CartItem[]
  totalQuantity: number
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<ProductItem>) {
      state.totalQuantity ++
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
      if(!existingItem) return
      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {        
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    }
  }
})

export const {addItemToCart, removeItemFromCart} = cartSlice.actions

export default cartSlice
