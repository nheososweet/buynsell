import "./style.scss";
import React from "react";

export type MessageType = "ME" | "OTHER";

interface ChatMessageProps {
  type: MessageType;
  text: string;
  avatar?: string;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  text,
  avatar,
  time,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Thời gian hiển thị trên tin nhắn */}
      <p className="text-xs text-gray-500 mb-1">{time}</p>

      <div
        className={`flex ${
          type === "ME" ? "justify-end" : "justify-start"
        } w-full my-2`}
      >
        {type === "OTHER" && avatar && (
          <img
            src={avatar}
            alt="Avatar"
            className="w-8 h-8 rounded-full mr-2"
          />
        )}
        <div
          className={`px-4 py-2 rounded-xl text-white ${
            type === "ME" ? "bg-sub-primary-color" : "bg-gray-500"
          }`}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
