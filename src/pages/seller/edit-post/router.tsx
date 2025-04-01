import SellerEditPostPage from ".";

const SellerEditPostRouter = [
  {
    path: "/seller/edit-post/:id",
    element: <SellerEditPostPage />,
    private: false,
    for_super_admin: false,
  },
];

export default SellerEditPostRouter;
