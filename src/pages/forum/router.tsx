import ForumPage from ".";
import PostDetailPage from "./detail";

const ForumRouter = [
  {
    path: "/buyer/forum",
    element: <ForumPage />,
    private: false,
    for_super_admin: false,
  },
  {
    path: "/buyer/forum/:id",
    element: <PostDetailPage />,
    private: false,
    for_super_admin: false,
  },
];

export default ForumRouter;
