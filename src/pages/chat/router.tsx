import ChatPage from ".";

const ChatRouter = [
  {
    path: "/buyer/chat/:id",
    element: <ChatPage />,
    private: false,
    for_super_admin: false,
  },
];

export default ChatRouter;
