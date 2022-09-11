import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useAppSelector } from '../../hooks';
import { default as CartItemType } from '../../types/cart-item'

const Cart = () => {
  const cartItems: CartItemType[] = useAppSelector(state => state.cart.items)

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map(item => (
          <CartItem item={item} key={item.id}/>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
