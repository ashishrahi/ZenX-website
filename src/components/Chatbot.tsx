import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PaperPlaneIcon, ChatBubbleIcon, Cross1Icon } from "@radix-ui/react-icons";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi there! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);

    // Simulate bot reply
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Thanks for reaching out! We'll get back to you shortly." },
      ]);
    }, 800);

    setUserInput("");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 z-50 bg-yellow-600 text-white rounded-full p-4 shadow-lg hover:bg-yellow-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <Cross1Icon className="w-6 h-6" /> : <ChatBubbleIcon className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-5 w-80 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-yellow-600 text-white px-4 py-3 font-semibold text-lg">
              Chat with us
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-72">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                      msg.sender === "user"
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 flex items-center p-3">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <motion.button
                onClick={handleSendMessage}
                className="ml-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg p-2 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PaperPlaneIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
