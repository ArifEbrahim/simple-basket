import { toggleCart } from '../../store/ui-slice'
import { useAppDispatch } from '../../hooks'
import classes from './CartButton.module.css'
import { useAppSelector } from '../../hooks';

const CartButton = () => {
  const dispatch = useAppDispatch()
  const totalQuantity = useAppSelector(state => state.cart.totalQuantity)

  const clickHandler = () => {
    dispatch(toggleCart())
  }

  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  )
}

export default CartButton
