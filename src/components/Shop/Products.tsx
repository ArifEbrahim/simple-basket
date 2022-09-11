import ProductItem from './ProductItem'
import classes from './Products.module.css'
import { default as ProductItemType } from '../../types/product-item'

const DUMMY_PRODUCTS: ProductItemType[] = [
  {
    id: Date.now()+1,
    price: 745,
    title: 'iPhone 12',
    description: 'from 2020'
  },
  {
    id: Date.now()+4,
    price: 845,
    title: 'iPhone 13',
    description: 'from 2021'
  },
  {
    id: Date.now()+8,
    price: 945,
    title: 'iPhone 14',
    description: 'from 2022'
  }
]

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(item => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  )
}

export default Products
