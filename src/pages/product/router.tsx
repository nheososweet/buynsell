import ProductDetailPage from ".";
const ProductDetailRouter = [
  {
    path: "/product/:id",
    element: <ProductDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default ProductDetailRouter;
