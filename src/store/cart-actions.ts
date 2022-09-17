import { showNotification } from '../store/ui-slice'
import { CartState } from '../types/cart-state'
import { replaceCart } from './cart-slice'
const URL: string = process.env.REACT_APP_FIREBASE_API ?? ''

export const fetchCartData = () => {
  return async (dispatch: any) => {
    const fetchData = async () => {
      const response = await fetch(URL)
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
      const data = await response.json()
      return data
    }
    try {
      const cartData = await fetchData()
      dispatch(replaceCart(cartData))
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!'
        })
      )
    }
  }
}

export const sendCartData = (cart: CartState) => {
  return async (dispatch: any) => {
    dispatch(
      showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!'
      })
    )
    const sendRequest = async () => {
      const response = await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify({
          item: cart.items,
          totaalQuantity: cart.totalQuantity
        })
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
    }

    try {
      await sendRequest()

      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!'
        })
      )
    } catch (error) {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        })
      )
    }
  }
}
