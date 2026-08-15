import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Trash2,
  Radio,
  RefreshCw,
  Cpu
} from "lucide-react";
import { sendChatMessage, speakText, stopSpeaking } from "../services/aiService";

export function ChatPlayground({ persona, settings }) {
  const isFirstPerson = persona.identity.perspective === "first_person";
  
  const [messages, setMessages] = useState(() => [
    {
      id: "intro-msg",
      sender: "ai",
      text: isFirstPerson
        ? `**SV-2 PILOT COMMS ONLINE.** 📡\n\nHey! I'm **${persona.identity.fullName}**'s AI Digital Twin. I'm calibrated with all my creative engineering archives—from my **Music Composition Web App** (Web Audio synthesis) to **Genshin Draft PvP**, **Electron Desktop Workspaces**, and full-stack platforms on Render.\n\nWhat telemetry or project shall we inspect?`
        : `**SV-2 COCKPIT SYSTEM INITIALIZED.** 📡\n\nHello! I am the tactical AI Representative representing **${persona.identity.fullName}** (@${persona.identity.handle}).\n\nAsk me anything about Ron's GitHub repositories, technical skills, web audio synthesis engines, or development philosophy!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      provider: "SV-2 INGRAM NEURAL CORE"
    }
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [speakingId, setSpeakingId] = useState(null);

  const scrollRef = useRef(null);
  const textareaRef = useRef(null);

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
          text: `[COMMS INTERRUPT] Encountered an issue: ${err.message}`,
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
          ? `Comms buffer cleared. Standing by for new directives! 🚀`
          : `Conversation reset. Ready to explore Ron's projects and repositories.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        provider: "SV-2 INGRAM NEURAL CORE"
      }
    ]);
  };

  const renderFormattedText = (text) => {
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
        {/* Cockpit HUD Bar */}
        <div className="chat-header-bar">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="telemetry-status-pill">
              <span className="status-mecha-blinker" style={{ position: "static", display: "inline-block" }}></span>
              {isFirstPerson ? "PILOT COCKPIT // 1ST PERSON" : "REPRESENTATIVE BOT // 3RD PERSON"}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.74rem", color: "var(--pat-police-dim)" }}>
              {settings.provider === "gemini" ? "⚡ GEMINI 1.5 FLASH" : settings.provider === "openai" ? "⚡ OPENAI LLM" : "⚡ OFFLINE INGRAM NEURAL CORE"}
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className="liquid-btn"
              style={{ padding: "4px 12px", fontSize: "0.74rem" }}
              onClick={handleClearChat}
              title="Clear Terminal Comms"
            >
              <Trash2 size={13} />
              Clear Comms
            </button>
          </div>
        </div>

        {/* Messages Stream */}
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
                    "YOU"
                  )}
                </div>

                <div className="msg-content-wrapper">
                  <div className="msg-bubble">
                    {renderFormattedText(msg.text)}
                  </div>

                  <div className="msg-meta">
                    <span>{msg.timestamp}</span>
                    {msg.provider && <span>// {msg.provider}</span>}

                    {isAi && (
                      <div className="msg-actions" style={{ marginLeft: "auto", display: "flex", gap: "6px" }}>
                        <button
                          className="liquid-btn"
                          style={{ padding: "3px 10px", fontSize: "0.72rem" }}
                          onClick={() => handleToggleSpeak(msg.text, msg.id)}
                          title="Listen with Text-to-Speech"
                        >
                          {speakingId === msg.id ? <VolumeX size={12} color="var(--pat-amber-vest)" /> : <Volume2 size={12} />}
                          <span>{speakingId === msg.id ? "Stop" : "Audio"}</span>
                        </button>
                        <button
                          className="liquid-btn"
                          style={{ padding: "3px 10px", fontSize: "0.72rem" }}
                          onClick={() => handleCopy(msg.text, msg.id)}
                          title="Copy message"
                        >
                          {copiedId === msg.id ? <Check size={12} color="var(--pat-radar-green)" /> : <Copy size={12} />}
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
              <div className="msg-bubble" style={{ display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--pat-amber-vest)" }}>
                <RefreshCw size={14} style={{ animation: "spin 1.2s linear infinite" }} />
                <span>[SV-2 NEURAL SYNC IN PROGRESS...]</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="quick-prompt-bar">
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "var(--pat-amber-vest)", display: "flex", alignItems: "center", gap: "4px" }}>
            <Radio size={12} /> TELEMETRY:
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

        {/* Input Capsule Bar */}
        <div className="chat-input-area">
          <div className="chat-input-box">
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              rows={1}
              placeholder={`Transmit message to ${persona.identity.preferredName}'s AI Twin...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="liquid-btn liquid-btn-amber"
              style={{ width: "42px", height: "42px", borderRadius: "9999px", padding: "0" }}
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              title="Transmit Message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
