import SellerCreatePostPage from ".";

const SellerCreatePostRouter = [
  {
    path: "/seller/create-post",
    element: <SellerCreatePostPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerCreatePostRouter;
