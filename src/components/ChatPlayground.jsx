import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Trash2,
  ExternalLink,
  Code2,
  RefreshCw
} from "lucide-react";
import { sendChatMessage, speakText, stopSpeaking } from "../services/aiService";

export function ChatPlayground({ persona, settings }) {
  const isFirstPerson = persona.identity.perspective === "first_person";
  
  const [messages, setMessages] = useState(() => [
    {
      id: "intro-msg",
      sender: "ai",
      text: isFirstPerson
        ? `Hey! I'm **${persona.identity.fullName}**'s AI twin. 👋\n\nI can tell you all about my work in **creative web development**, like my **Music Composition Web App**, **Genshin Draft PvP** tool, **Electron desktop workspaces**, or my full-stack projects on Render.\n\nWhat would you like to explore?`
        : `Hello! I'm the digital twin assistant representing **${persona.identity.fullName}** (@${persona.identity.handle}).\n\nAsk me anything about Ron's GitHub repositories, technical skills, web audio experiments, or development philosophy!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      provider: "Ron AI Core"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customText) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || isLoading) return;

    const userMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage({
        messages: updatedMessages,
        persona,
        settings
      });

      const aiMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        provider: response.provider
      };

      setMessages(prev => [...prev, aiMessage]);

      // If voice autoplay is enabled in settings
      if (settings.voiceEnabled) {
        speakText(response.text);
        setSpeakingId(aiMessage.id);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "ai",
          text: `Oops! Encountered an issue: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (text, id) => {
    if (speakingId === id) {
      stopSpeaking();
      setSpeakingId(null);
    } else {
      speakText(text);
      setSpeakingId(id);
    }
  };

  const handleClearChat = () => {
    stopSpeaking();
    setMessages([
      {
        id: "reset-msg",
        sender: "ai",
        text: isFirstPerson
          ? `Chat cleared! What shall we talk about next? 🚀`
          : `Conversation reset. How can I help you explore Ron's projects?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        provider: "Ron AI Core"
      }
    ]);
  };

  // Convert basic markdown in messages (bold, links, code) into styled elements
  const renderFormattedText = (text) => {
    // Process markdown paragraphs
    const paragraphs = text.split("\n\n");
    return paragraphs.map((para, pIdx) => {
      const lines = para.split("\n");
      return (
        <p key={pIdx}>
          {lines.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {renderFormattedLine(line)}
              {lIdx < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
      );
    });
  };

  const renderFormattedLine = (line) => {
    // Basic regex parser for **bold**, `code`, and [links](url)
    const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
    const parts = line.split(regex);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const title = part.match(/\[(.*?)\]/)?.[1] || "";
        const url = part.match(/\((.*?)\)/)?.[1] || "#";
        return (
          <a key={index} href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-main">
        {/* Chat Top Header */}
        <div className="chat-header-bar">
          <div className="chat-identity-pill">
            <span className="status-badge">
              <span className="status-dot-pulse"></span>
              {isFirstPerson ? "1st Person Persona Active" : "Representative Mode"}
            </span>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              {settings.provider === "gemini" ? "⚡ Powered by Gemini 1.5" : settings.provider === "openai" ? "⚡ Powered by OpenAI" : "⚡ Intelligent Persona Simulation"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="msg-action-btn"
              onClick={handleClearChat}
              title="Clear Conversation"
            >
              <Trash2 size={14} />
              Clear
            </button>
          </div>
        </div>

        {/* Chat Scroll View */}
        <div className="chat-scroll-area" ref={scrollRef}>
          {messages.map((msg) => {
            const isAi = msg.sender === "ai";
            return (
              <div key={msg.id} className={`message-row ${isAi ? "ai" : "user"}`}>
                <div className={`msg-avatar ${isAi ? "ai" : "user"}`}>
                  {isAi ? (
                    <img
                      src={persona.identity.avatarUrl}
                      alt={persona.identity.preferredName}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    "You"
                  )}
                </div>

                <div className="msg-content-wrapper">
                  <div className="msg-bubble">
                    {renderFormattedText(msg.text)}
                  </div>

                  <div className="msg-meta">
                    <span>{msg.timestamp}</span>
                    {msg.provider && <span>• {msg.provider}</span>}

                    {isAi && (
                      <div className="msg-actions" style={{ marginLeft: "auto" }}>
                        <button
                          className="msg-action-btn"
                          onClick={() => handleToggleSpeak(msg.text, msg.id)}
                          title="Listen with Text-to-Speech"
                        >
                          {speakingId === msg.id ? <VolumeX size={12} color="#38bdf8" /> : <Volume2 size={12} />}
                          <span>{speakingId === msg.id ? "Stop" : "Listen"}</span>
                        </button>
                        <button
                          className="msg-action-btn"
                          onClick={() => handleCopy(msg.text, msg.id)}
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                          <span>{copiedId === msg.id ? "Copied" : "Copy"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="message-row ai">
              <div className="msg-avatar ai">
                <img
                  src={persona.identity.avatarUrl}
                  alt={persona.identity.preferredName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="msg-bubble" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <RefreshCw size={14} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
                <span>{persona.identity.preferredName} is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Sample Prompts Bar */}
        <div className="quick-prompt-bar">
          <span style={{ fontSize: "0.74rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Sparkles size={12} color="#38bdf8" /> Ask:
          </span>
          {persona.samplePrompts?.map((prompt, idx) => (
            <button
              key={idx}
              className="prompt-chip"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="chat-input-area">
          <div className="chat-input-box">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              rows={1}
              placeholder={`Ask ${persona.identity.preferredName} anything about his projects, coding stack, or background...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="btn-send"
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              title="Send Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
