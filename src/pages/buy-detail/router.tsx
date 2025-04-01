import BuyDetailPage from ".";

const BuyDetailRouter = [
  {
    path: "/buyer/buy/:id",
    element: <BuyDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default BuyDetailRouter;
