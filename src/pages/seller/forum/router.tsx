import SellerForumPage from ".";
import SellerPostDetailPage from "./detail";

const SellerForumRouter = [
  {
    path: "/seller/forum",
    element: <SellerForumPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "/seller/forum/:id",
    element: <SellerPostDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerForumRouter;
