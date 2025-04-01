import OrderPage from ".";
import OrderDetailPage from "./OrderDetail";
const SellerOrderRouter = [
  {
    path: "/seller/order",
    element: <OrderPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "/seller/order/:id",
    element: <OrderDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerOrderRouter;
