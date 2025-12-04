// components/Chatbot.js - Light Theme Support
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from './Avatar';

const STORAGE_KEY = 'ttcecs_chat_history_v1';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [theme, setTheme] = useState('light');
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);
  const recognitionRef = useRef(null);

  // Get theme from document
  useEffect(() => {
    const getTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      setTheme(currentTheme);
    };
    getTheme();

    // Watch for theme changes
    const observer = new MutationObserver(getTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  // Restore chat history
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setMessages(JSON.parse(raw));
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } else {
      setMessages([{
        id: Date.now(),
        text: '👋 Hi, I\'m THECOS Assistant — how can I help you today?',
        sender: 'bot',
        timestamp: Date.now()
      }]);
    }
  }, []);

  // Persist messages
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-open
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  // Text-to-speech
  const speakText = (text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
    }
  };

  // Send message
  const handleSend = async (rawText) => {
    const text = (rawText || input || '').trim();
    if (!text) return;

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        text: data.reply || 'Sorry, I encountered an error.',
        sender: 'bot',
        sentiment: data.sentiment,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
      speakText(botMessage.text);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Sorry, I\'m having trouble connecting. Please try again.',
          sender: 'bot',
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Voice recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice input is not supported in this browser.');
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onerror = () => setListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSend(transcript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error('Voice recognition error:', e);
      setListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setListening(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (confirm('Clear all chat history?')) {
      setMessages([{
        id: Date.now(),
        text: '👋 Hi, I\'m THECOS Assistant — how can I help you today?',
        sender: 'bot',
        timestamp: Date.now()
      }]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Theme-aware styles
  const isDark = theme === 'dark';
  const buttonBg = isDark ? 'bg-electric' : 'bg-brand-blue';
  const buttonText = isDark ? 'text-[#00121a]' : 'text-white';
  const chatBg = isDark ? 'bg-[#0a1929]' : 'bg-white';
  const borderColor = isDark ? 'border-white/10' : 'border-brand-gray-light';
  const userBubbleBg = isDark ? 'bg-electric text-[#00121a]' : 'bg-brand-blue text-white';
  const botBubbleBg = isDark ? 'bg-white/10 text-white' : 'bg-brand-gray-light text-brand-teal';

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 ${buttonBg} ${buttonText} rounded-full shadow-2xl flex items-center justify-center font-black text-xl hover:scale-110 transition-transform`}
        style={{ zIndex: 99999, pointerEvents: 'auto' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        role="button"
        tabIndex={0}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-24 right-6 z-[60] w-[90vw] max-w-md h-[500px] ${chatBg} border ${borderColor} rounded-2xl shadow-2xl flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className={`px-4 py-3 ${isDark ? 'bg-[#071428]' : 'bg-gradient-to-r from-brand-blue to-brand-purple'} border-b ${borderColor} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <Avatar type="bot" name="THECOS" size={36} />
                <div>
                  <h3 className={`font-bold text-sm text-white`}>THECOS Assistant</h3>
                  <p className={`text-xs ${isDark ? 'text-muted' : 'text-white/90'}`}>Always here to help</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  title={voiceEnabled ? 'Disable voice' : 'Enable voice'}
                  className={`px-2 py-1 rounded-md text-xs ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/20 hover:bg-white/30'} transition`}
                >
                  {voiceEnabled ? '🔊' : '🔇'}
                </button>
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className={`px-2 py-1 rounded-md text-xs ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/20 hover:bg-white/30'} transition`}
                >
                  🗑️
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`px-2 py-1 rounded-md text-xs ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-white/20 hover:bg-white/30'} transition`}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={chatRef}
              className="flex-1 p-3 overflow-y-auto space-y-3 min-h-[200px]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: isDark ? 'rgba(0,217,255,0.2) transparent' : 'rgba(39,169,225,0.3) transparent'
              }}
            >
              {messages.map((msg) => {
                const isBot = msg.sender === 'bot';
                const time = new Date(msg.timestamp || Date.now()).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-2 items-end`}
                  >
                    <div className="flex-shrink-0">
                      <Avatar type={isBot ? 'bot' : 'user'} name={isBot ? 'THECOS' : 'You'} size={32} />
                    </div>

                    <div className={`max-w-[78%] ${isBot ? 'self-start' : 'self-end'}`}>
                      <div className={`${isBot ? botBubbleBg : userBubbleBg} p-2.5 rounded-xl break-words text-sm`}>
                        {msg.text}
                      </div>
                      <div className={`text-[10px] opacity-60 mt-1 px-1 ${isDark ? 'text-white' : 'text-brand-gray'}`}>
                        {time}
                        {msg.sentiment && ` · ${msg.sentiment}`}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-2 items-end">
                  <Avatar type="bot" size={32} />
                  <div className={botBubbleBg + ' px-4 py-3 rounded-xl'}>
                    <div className="flex gap-1">
                      <span className={`w-2 h-2 ${isDark ? 'bg-muted' : 'bg-brand-blue'} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
                      <span className={`w-2 h-2 ${isDark ? 'bg-muted' : 'bg-brand-blue'} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
                      <span className={`w-2 h-2 ${isDark ? 'bg-muted' : 'bg-brand-blue'} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`px-3 py-2 border-t ${borderColor} ${isDark ? 'bg-black/10' : 'bg-gray-50'}`}>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => (listening ? stopListening() : startListening())}
                  title={listening ? 'Stop listening' : 'Voice input'}
                  className={`p-2 rounded-md transition ${listening
                    ? 'bg-red-500 text-white animate-pulse'
                    : isDark
                      ? 'bg-white/10 text-white hover:bg-white/20'
                      : 'bg-brand-gray-light text-brand-teal hover:bg-brand-gray-light/70'
                    }`}
                >
                  {listening ? '●' : '🎤'}
                </button>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={listening ? 'Listening...' : 'Type or use voice...'}
                  rows={1}
                  disabled={listening}
                  className={`flex-1 resize-none bg-transparent outline-none px-3 py-2 text-sm max-h-28 ${isDark ? 'text-white' : 'text-brand-teal'}`}
                />

                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || listening}
                  className={`px-3 py-2 rounded-md ${buttonBg} ${buttonText} font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition hover:opacity-90`}
                >
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
