import { useAppSelector, useAppDispatch } from './hooks'
import { useEffect } from 'react'
import { sendCartData, fetchCartData } from './store/cart-actions'

import Layout from './components/Layout/'
import Cart from './components/Cart/Cart'
import Products from './components/Shop/Products'
import Notification from './components/UI/Notification'

let isInitial = true

function App() {
  const dispatch = useAppDispatch()
  const isCartVisible = useAppSelector(state => state.ui.isCartVisible)
  const cart = useAppSelector(state => state.cart)
  const notification = useAppSelector(state => state.ui.notification)

  useEffect(() => {
    dispatch(fetchCartData)
  }, [dispatch])

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }

    if (cart.updated) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  )
}

export default App
