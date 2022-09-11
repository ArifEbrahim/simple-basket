import Card from '../UI/Card'
import classes from './ProductItem.module.css'
import { default as ProductItemType } from '../../types/product-item'
import { useAppDispatch } from '../../hooks'
import { addItemToCart } from '../../store/cart-slice'

const ProductItem: React.FC<ProductItemType> = props => {
  const { id, title, price, description } = props
  const dispatch = useAppDispatch()

  const addToCartHandler = () => {
    const item: ProductItemType = { id, title, price }
    dispatch(addItemToCart(item))
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>£{price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  )
}

export default ProductItem
