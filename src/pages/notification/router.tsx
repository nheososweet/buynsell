import NotificationPage from ".";
import NotiDetailPage from "./detail";

const BuyerNotiRouter = [
  {
    path: "/buyer/noti",
    element: <NotificationPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "/buyer/noti/:id",
    element: <NotiDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default BuyerNotiRouter;
