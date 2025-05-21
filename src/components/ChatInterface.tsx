
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInterfaceProps {
  messages: Array<{ type: string; content: string }>;
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInterface = ({ messages, onSendMessage, isLoading }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="p-4 max-h-64 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 ${
              message.type === "user" ? "flex justify-end" : "flex justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] ${
                message.type === "user"
                  ? "bg-shop-primary text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-3">
            <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t p-3 flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What would you like to buy?"
          className="resize-none min-h-[40px] max-h-32"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          disabled={isLoading}
        />
        <Button type="submit" size="icon" variant="ghost" disabled={isLoading || !input.trim()}>
          <Send size={18} className={`${input.trim() ? 'text-shop-primary' : 'text-gray-400'}`} />
        </Button>
      </form>
    </div>
  );
};
