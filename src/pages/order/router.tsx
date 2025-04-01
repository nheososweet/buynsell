import OrderPage from ".";
import OrderDetailPage from "./OrderDetail";
const OrderRouter = [
  {
    path: "/buyer/order",
    element: <OrderPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "/buyer/order/:id",
    element: <OrderDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default OrderRouter;
