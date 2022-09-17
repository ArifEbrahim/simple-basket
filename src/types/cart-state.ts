import CartItem from "./cart-item"

export type CartState = {
  items: CartItem[]
  totalQuantity: number
  updated: boolean
}