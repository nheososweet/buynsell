import PaymentPage from ".";
const PaymentRouter = [
  {
    path: "/payment/",
    element: <PaymentPage />,
    private: false,
    for_super_admin: false,
  },
];

export default PaymentRouter;
