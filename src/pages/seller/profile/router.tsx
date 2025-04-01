import SellerProfilePage from ".";

const SellerProfileRouter = [
  {
    path: "/seller/profile",
    element: <SellerProfilePage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerProfileRouter;
