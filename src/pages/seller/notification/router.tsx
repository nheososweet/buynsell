import NotificationPage from ".";
import NotiDetailPage from "./detail";

const SellerNotiRouter = [
  {
    path: "/seller/noti",
    element: <NotificationPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "/seller/noti/:id",
    element: <NotiDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerNotiRouter;
