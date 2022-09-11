import { useAppSelector } from './hooks';

import Layout from './components/Layout/'
import Cart from './components/Cart/Cart'
import Products from './components/Shop/Products';

function App() {
  const isCartVisible = useAppSelector(state => state.ui.isCartVisible)

  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  )
}

export default App
