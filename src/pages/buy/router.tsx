import BuyPage from ".";

const BuyRouter = [
  {
    path: "/buyer/buy",
    element: <BuyPage />,
    private: false,
    for_super_admin: false,
  },
];

export default BuyRouter;
