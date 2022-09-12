import { useAppSelector, useAppDispatch } from './hooks'
import { useEffect } from 'react'
import { showNotification } from './store/ui-slice'

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
    const sendCartData = async () => {
      dispatch(
        showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending cart data!'
        })
      )
      const response = await fetch(URL, {
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if (!response.ok) {
        throw new Error('Sending cart data failed.')
      }
      dispatch(
        showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Sent cart data successfully!'
        })
      )
    }

    if (isInitial) {
      isInitial = false
      return
    }

    sendCartData().catch(error => {
      dispatch(
        showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!'
        })
      )
    })
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
