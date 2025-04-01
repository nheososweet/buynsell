import SellerHomeDetailPage from ".";

const SellerHomeDetailRouter = [
  {
    path: "/seller/home/:id",
    element: <SellerHomeDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerHomeDetailRouter;
