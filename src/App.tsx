import { useAppSelector, useAppDispatch } from './hooks'
import { useEffect } from 'react'
import { sendCartData } from './store/cart-slice'

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
  const URL: string = process.env.REACT_APP_FIREBASE_API ?? ''

  useEffect(() => {
    if (isInitial) {
      isInitial = false
      return
    }
    dispatch(sendCartData(cart))
  }, [cart, URL, dispatch])

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
