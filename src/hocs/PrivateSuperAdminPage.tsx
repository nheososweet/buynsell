import LoadingPage from "@/layouts/base-page/loadingpage";
import { useUserStore } from "@/pages/authenticate/state";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateSuperAdminPage = ({ children }: React.PropsWithChildren) => {
  const is_logged = useUserStore((state) => state.is_logged);
  const getUserInformation = useUserStore((state) => state.getUserInformation);
  const { user } = useUserStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!is_logged) {
      setLoading(false);
      return;
    }

    if (user?.is_superadmin === undefined) {
      getUserInformation().finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [is_logged, user?.is_superadmin, getUserInformation]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user?.is_superadmin || (!user?.is_superadmin && user.role !== "admin")) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export default PrivateSuperAdminPage;
