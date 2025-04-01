import BasePage from "@/layouts/base-page";
import "./style.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useRef } from "react";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import ChatMessage, { MessageType } from "./ChatMessage";
import SendIcon from "@mui/icons-material/Send";

const initialMessages = [
  {
    type: "OTHER",
    text: "Hello",
    avatar: "/assets/avatar.jpg",
    time: "TH 5 LÚC 12:00",
  },
  { type: "ME", text: "Hello", time: "TH 5 LÚC 12:01" },
  {
    type: "OTHER",
    text: "Bán tủ gỗ đựng giày dép",
    avatar: "/assets/avatar.jpg",
    time: "TH 5 LÚC 12:02",
  },
];

const ChatPage = () => {
  const nav = useNavigate();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (!inputText.trim() && !selectedImage) return;

    const newMessage = {
      type: "ME",
      text: selectedImage ? "[Ảnh đã gửi]" : inputText,
      time: new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: selectedImage || undefined,
    };

    setMessages([...messages, newMessage]);
    setInputText("");
    setSelectedImage(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  return (
    <div>
      <BasePage
        topLeftTitle=""
        topNodeLeft={<h1>Buy</h1>}
        bottomRightNode={<h1>Buy</h1>}
        headerContent={
          <div className="flex items-center gap-3">
            <img
              src="/assets/avatar.jpg"
              className="w-8 h-8 rounded-full"
              alt=""
            />
            <p className="text-base font-semibold text-white">Thanh Thảo</p>
          </div>
        }
        isChatLayout
        onBack={() => nav(-1)}
      >
        <div className="px-4 pt-4 pb-2 relative h-[calc(100vh-70px-24px)] overflow-y-auto">
          <div className="overflow-auto h-[calc(100vh-70px-24px-50px)] pb-6">
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                type={msg.type as MessageType}
                text={msg.text}
                time={msg.time}
                avatar={msg.avatar}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-3 right-3 h-[50px] flex items-center">
            <input
              type="text"
              className="h-full flex-1 focus:outline-none pl-3 pr-[84px] w-full border border-primary-color rounded-md"
              placeholder="Nhập tin nhắn..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <AddPhotoAlternateOutlinedIcon
              className="absolute right-[44px] cursor-pointer"
              onClick={handleOpenFilePicker}
            />
            <SendIcon
              className="absolute right-3 cursor-pointer text-primary-color"
              onClick={handleSendMessage}
            />
          </div>
        </div>
      </BasePage>
    </div>
  );
};

export default ChatPage;
