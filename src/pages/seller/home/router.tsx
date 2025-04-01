import SellerHomePage from ".";

const SellerHomeRouter = [
  {
    path: "/seller/home",
    element: <SellerHomePage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerHomeRouter;
