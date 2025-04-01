import CartPage from ".";

const CartRouter = [
  {
    path: "/buyer/cart",
    element: <CartPage />,
    private: false,
    for_super_admin: false,
  },
];

export default CartRouter;
