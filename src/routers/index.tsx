import PrivatePage from "@/hocs/PrivatePage";
import PrivateSuperAdminPage from "@/hocs/PrivateSuperAdminPage";
import AnalysisRouter from "@/pages/analysis/router";
import AuthenticateRouter from "@/pages/authenticate/router";
import BuyDetailRouter from "@/pages/buy-detail/router";
import BuyRouter from "@/pages/buy/router";
import CartRouter from "@/pages/cart/router";
import ChatRouter from "@/pages/chat/router";
import ChatPageRouter from "@/pages/chat/router";
import DashboardRouter from "@/pages/dashboard/router";
import ForumRouter from "@/pages/forum/router";
import HistoryPageRouter from "@/pages/history/router";
import BuyerNotiRouter from "@/pages/notification/router";
import OrderRouter from "@/pages/order/router";
import PaymentRouter from "@/pages/payment/router";
import ProductDetailRouter from "@/pages/product/router";
import ProfileRouter from "@/pages/profile/router";
import SellerCreatePostRouter from "@/pages/seller/create-post/router";
import SellerEditPostRouter from "@/pages/seller/edit-post/router";
import SellerForumRouter from "@/pages/seller/forum/router";
import SellerHomeDetailRouter from "@/pages/seller/home-detail/router";
import SellerHomeRouter from "@/pages/seller/home/router";
import SellerNotiRouter from "@/pages/seller/notification/router";
import SellerOrderRouter from "@/pages/seller/order/router";
import SellerProfileRouter from "@/pages/seller/profile/router";
import SellerSellRouter from "@/pages/seller/sell/router";

import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const routes = [
  ...AuthenticateRouter,
  ...DashboardRouter,
  ...ChatPageRouter,
  ...HistoryPageRouter,
  ...BuyRouter,
  ...AnalysisRouter,
  ...ForumRouter,
  ...BuyDetailRouter,
  ...ChatRouter,
  ...SellerHomeRouter,
  ...ProfileRouter,
  ...SellerProfileRouter,
  ...SellerForumRouter,
  ...SellerHomeDetailRouter,
  ...SellerSellRouter,
  ...SellerCreatePostRouter,
  ...CartRouter,
  ...OrderRouter,
  ...ProductDetailRouter,
  ...PaymentRouter,
  ...SellerOrderRouter,
  ...BuyerNotiRouter,
  ...SellerNotiRouter,
  ...SellerEditPostRouter,
];

export default function RouteList() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={uuidv4()}
          path={route.path}
          element={
            route.private ? (
              <>
                {route.for_super_admin ? (
                  <PrivateSuperAdminPage>{route.element}</PrivateSuperAdminPage>
                ) : (
                  <PrivatePage>{route.element}</PrivatePage>
                )}
              </>
            ) : (
              route.element
            )
          }
        />
      ))}
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}
