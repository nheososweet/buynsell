import MasterLayout from "@/layouts/master";
import DashboardPage from ".";

const DashboardRouter = [
  {
    path: "/dashboard",
    element: (
      <MasterLayout>
        <DashboardPage />
      </MasterLayout>
    ),
    private: true,
    for_super_admin: true,
  },
];

export default DashboardRouter;
