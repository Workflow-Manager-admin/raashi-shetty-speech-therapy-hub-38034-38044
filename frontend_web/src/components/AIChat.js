import React, { useState, useRef, useEffect } from "react";
import "./AIChat.css";

// PUBLIC_INTERFACE
/** Informational AI chat UI (demo, non-functional until backend/AI endpoint integration). */
function AIChat() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I'm SpeechBridge AI. Ask me anything about speech therapy, appointments, or our services!" },
  ]);
  const [input, setInput] = useState("");
  const [waiting, setWaiting] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: "user", text: input }]);
    setInput("");
    setWaiting(true);

    // TODO: Integrate AI via backend API or service
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { sender: "ai", text: "I'm just a demo right now, but with integration I can answer all your Speech Bridge and therapy-related questions!" },
      ]);
      setWaiting(false);
    }, 900);
  };

  return (
    <section className="ai-chat-section">
      <h2>Ask SpeechBridge AI</h2>
      <div className="ai-chat-box">
        <div className="ai-chat-history">
          {messages.map((msg, i) => (
            <div className={`ai-msg ai-msg-${msg.sender}`} key={i}>
              {msg.sender === "ai" ? "🤖" : "🧑‍💼"} {msg.text}
            </div>
          ))}
          {waiting && <div className="ai-msg ai-msg-ai">🤖 ...</div>}
          <div ref={chatEndRef} />
        </div>
        <form className="ai-chat-input-row" onSubmit={sendMessage}>
          <input
            className="ai-chat-input"
            value={input}
            disabled={waiting}
            onChange={e => setInput(e.target.value)}
            placeholder="Type your question here..."
          />
          <button className="btn ai-chat-btn" type="submit" disabled={waiting || !input.trim()}>Send</button>
        </form>
      </div>
    </section>
  );
}

export default AIChat;
