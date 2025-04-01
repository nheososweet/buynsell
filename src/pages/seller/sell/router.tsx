import SellerSellPage from ".";

const SellerSellRouter = [
  {
    path: "/seller/sell",
    element: <SellerSellPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerSellRouter;
