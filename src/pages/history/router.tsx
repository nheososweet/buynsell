import MasterLayout from "@/layouts/master";
import HistoryPage from ".";

const HistoryPageRouter = [
  {
    path: "/history",
    element: (
      <MasterLayout>
        <HistoryPage />
      </MasterLayout>
    ),
    private: true,
    for_super_admin: false,
  },
];

export default HistoryPageRouter;
