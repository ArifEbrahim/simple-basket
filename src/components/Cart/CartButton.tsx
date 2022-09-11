import { toggleCart } from '../../store/ui-slice'
import { useAppDispatch } from '../../hooks'
import classes from './CartButton.module.css'

const CartButton = () => {
  const dispatch = useAppDispatch()

  const clickHandler = () => {
    dispatch(toggleCart())
  }

  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  )
}

export default CartButton
