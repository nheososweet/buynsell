import ProfilePage from ".";

const ProfileRouter = [
  {
    path: "/buyer/profile",
    element: <ProfilePage />,
    private: false,
    for_super_admin: false,
  },
];

export default ProfileRouter;
