import classes from './CartItem.module.css'
import { default as CartItemType } from '../../types/cart-item'
import { useAppDispatch } from '../../hooks'
import { addItemToCart, removeItemFromCart } from '../../store/cart-slice'
import ProductItem from '../../types/product-item'

interface Props {
  item: CartItemType
}

const CartItem: React.FC<Props> = props => {
  const { title, quantity, totalPrice, price, id } = props.item
  const dispatch = useAppDispatch()

  const addItemHandler = () => {
    const item: ProductItem = { id, price, title }
    dispatch(addItemToCart(item))
  }

  const removeItemHandler = () => {
    dispatch(removeItemFromCart(id))
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          £{totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(£{price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
