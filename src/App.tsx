import { useAppSelector } from './hooks'
import { useEffect } from 'react'

import Layout from './components/Layout/'
import Cart from './components/Cart/Cart'
import Products from './components/Shop/Products'

function App() {
  const isCartVisible = useAppSelector(state => state.ui.isCartVisible)
  const cart = useAppSelector(state => state.cart)
  const URL: string = process.env.REACT_APP_FIREBASE_API ?? ''

  useEffect(() => {
    fetch(URL, {
      method: 'PUT',
      body: JSON.stringify(cart)
    })
  }, [cart, URL])

  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  )
}

export default App
