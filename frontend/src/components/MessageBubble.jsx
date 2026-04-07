export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          isUser
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-200 text-gray-600"
        }`}
      >
        {isUser ? "U" : "A"}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[72%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "bg-blue-600 text-white rounded-2xl rounded-br-sm"
            : "bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-200"
        }`}
      >
        {message.content}
      </div>
    </div>
  );
}