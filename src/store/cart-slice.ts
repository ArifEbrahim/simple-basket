import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CartItem from '../types/cart-item'
import ProductItem from '../types/product-item'
import { showNotification } from '../store/ui-slice'
const URL: string = process.env.REACT_APP_FIREBASE_API ?? ''

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
      state.totalQuantity++
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
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    }
  }
})

export const sendCartData = (cart:CartState) => {
  return async (useAppDispatch:any) => {
    useAppDispatch(
      showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      })
    )
    const sendRequest = async () => {
      const response = await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()

      useAppDispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!'
        })
      )
    } catch (error) {
      useAppDispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        })
      )
    }
  }
}

export const { addItemToCart, removeItemFromCart } = cartSlice.actions

export default cartSlice
