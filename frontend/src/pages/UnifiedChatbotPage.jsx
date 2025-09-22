import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';
import { Alert, Button, Spinner, Card, Form, InputGroup, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

// Tailwind-based UI replacement for UnifiedChatbotPage
export default function UnifiedChatbotPage() {
  // --- State (unchanged) ---
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSession, setCurrentSession] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions] = useState([
    'How do I check my balance?',
    'What are your transfer limits?',
    'How do I reset my password?',
    'How do I increase my daily limit?',
    'How to enable net banking?',
    'Reset debit PIN'
  ]);

  const [chatHistory, setChatHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, hasMore: true });
  const [currentView, setCurrentView] = useState('chat');

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const token = getAuthToken();

  const faqs = [
    { question: 'How do I reset my password?', category: 'Security' },
    { question: 'What are my transfer limits?', category: 'Transfers' },
    { question: 'How to increase daily limit?', category: 'Limits' },
    { question: 'How do I check my balance?', category: 'Account' },
    { question: 'Reset debit PIN', category: 'Cards' },
    { question: 'How to enable net banking?', category: 'Services' }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  useEffect(() => {
    const initialize = async () => {
      try {
        const session = await api.chatbot.createSession({ title: 'Customer Support Chat' }, token);
        setCurrentSession(session);
        await fetchChatHistory();
        setInitialLoading(false);
      } catch (err) {
        if (err.type === 'AUTH_ERROR') navigate('/login');
        else setError('Failed to initialize chat. Please try again.');
        setInitialLoading(false);
      }
    };
    initialize();
  }, [navigate, token]);

  useEffect(() => {
    if (startDate || endDate) {
      fetchChatHistory(false);
    }
  }, [startDate, endDate]);

  const fetchChatHistory = async (isLoadMore = false) => {
    const loadingSetter = isLoadMore ? setLoadingMore : setHistoryLoading;
    try {
      loadingSetter(true);

      const params = { page: isLoadMore ? pagination.page + 1 : 1, limit: pagination.limit };
      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.chatbot.getHistory(params, token);

      setChatHistory(prev => isLoadMore ? [...prev, ...response.data] : response.data);
      setPagination(prev => ({ ...prev, page: isLoadMore ? prev.page + 1 : 1, hasMore: response.hasMore }));
    } catch (err) {
      if (err.type === 'AUTH_ERROR') navigate('/login');
      else setError('Failed to fetch chat history.');
    } finally {
      loadingSetter(false);
    }
  };

  const handleSendMessage = async (messageText = currentMessage) => {
    if (!messageText || !messageText.trim()) return;
    if (!currentSession?.id) {
      setError('Chat session not ready. Please refresh.');
      return;
    }

    const userMessage = { content: messageText, role: 'user', timestamp: new Date().toISOString() };

    try {
      setLoading(true);
      setError(null);
      setMessages(prev => [...prev, userMessage]);
      setCurrentMessage('');
      setIsTyping(true);

      await api.chatbot.saveMessage(String(currentSession.id), userMessage, token);

      const response = await api.chatbot.sendMessage({ message: messageText.trim() }, token);
      const { reply, confidence_score, sources } = response;
      const botMessage = { content: reply, role: 'assistant', confidence_score, metadata: { sources }, timestamp: new Date().toISOString() };

      await api.chatbot.saveMessage(String(currentSession.id), botMessage, token);
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      if (err.type === 'AUTH_ERROR') navigate('/login');
      else setError('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleNewChat = async () => {
    try {
      setLoading(true);
      const session = await api.chatbot.createSession({ title: 'Customer Support Chat' }, token);
      setCurrentSession(session);
      setMessages([]);
      setCurrentMessage('');
      setError(null);
      setCurrentView('chat');
    } catch (err) {
      if (err.type === 'AUTH_ERROR') navigate('/login');
      else setError('Failed to create new chat session.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredHistory = Array.isArray(chatHistory) ? chatHistory.filter(session => {
    const matchesSearch = searchTerm === '' || (Array.isArray(session.messages) && session.messages.some(msg => typeof msg.content === 'string' && msg.content.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesSearch;
  }) : [];

  const clearFilters = () => {
    setSearchTerm('');
    setStartDate(null);
    setEndDate(null);
    fetchChatHistory();
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-6 w-6 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // --- UI: Tailwind markup that matches provided HTML design ---
  return (
    <div className="w-full max-w-6xl mx-auto bg-background-light dark:bg-background-dark rounded-lg shadow-lg flex h-[90vh]">
      {/* Sidebar */}
      <aside className="w-80 bg-sidebar-light dark:bg-sidebar-dark border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">History & FAQs</h2>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Chat History</h3>
          <ul className="space-y-2">
            {(Array.isArray(chatHistory) ? chatHistory : []).slice(0,5).map((session, idx) => {
              const messagesArr = Array.isArray(session.messages) ? session.messages : [];
              const firstUserMessage = messagesArr.find(m => m.role === 'user');
              const displayDate = session.createdAt || (messagesArr.length > 0 ? messagesArr[0].timestamp : new Date().toISOString());
              return (
                <li key={session.id || idx}>
                  <button
                    onClick={() => { setCurrentView('history'); if (firstUserMessage?.content) setSearchTerm(firstUserMessage.content); }}
                    className={`block w-full text-left p-2 rounded-lg ${idx === 0 ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
                  >
                    <p className="font-medium text-sm truncate">{firstUserMessage?.content || 'New Chat'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(displayDate).toLocaleDateString()}</p>
                  </button>
                </li>
              );
            })}

            {(!Array.isArray(chatHistory) || chatHistory.length === 0) && (
              <li>
                <div className="text-sm text-gray-500">No recent conversations</div>
              </li>
            )}
          </ul>

          <div className="pt-4">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Common FAQs</h3>
            <ul className="space-y-2 mt-2">
              {faqs.slice(0,4).map((faq, i) => (
                <li key={i}>
                  <button
                    onClick={() => { setCurrentView('chat'); handleSendMessage(faq.question); }}
                    className="text-sm text-primary hover:underline"
                    disabled={loading || isTyping}
                  >
                    {faq.question}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleNewChat}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-base">add</span>
            New Chat
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Help & Chatbot</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ask about debit cards, net banking, transfers, etc.</p>
        </div>

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Initial bot message */}
          {messages.length === 0 && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">smart_toy</span>
              </div>
              <div className="max-w-md">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <p className="text-sm text-gray-800 dark:text-gray-200">Hi! How can I help today?</p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">Bot • {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          )}

          {/* Render messages */}
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex items-start gap-3'}>
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">smart_toy</span>
                </div>
              )}

              <div className={msg.role === 'user' ? 'max-w-md text-right' : 'max-w-md'}>
                <div className={`${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'} rounded-lg p-3`}> 
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary">support_agent</span>
                      <small className="text-muted text-sm">Support Bot</small>
                    </div>
                  )}

                  <div className="mb-1 whitespace-pre-wrap">{msg.content}</div>
                  <small className={`${msg.role === 'user' ? 'text-white/80' : 'text-gray-400 text-sm'}`}>{new Date(msg.timestamp).toLocaleTimeString()}</small>

                  {msg.role === 'assistant' && msg.confidence_score != null && (
                    <div className="mt-2 text-xs text-gray-500">Confidence: {msg.confidence_score}</div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">smart_toy</span>
              </div>
              <div className="max-w-md">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="typing-indicator flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse delay-150" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse delay-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />

          {/* Suggestions */}
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 ml-11">Suggestions</p>
            <div className="flex flex-wrap gap-2 ml-11">
              {(Array.isArray(suggestions) ? suggestions : []).filter(s => Array.isArray(messages) ? !messages.some(m => m.content === s) : true).slice(0,4).map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(s)}
                  disabled={loading || isTyping}
                  className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-60"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input area */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="mb-4">
            <p className="font-semibold text-gray-900 dark:text-white">Escalate to human support</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">We'll log your chats to chatbot_logs</p>
          </div>

          {error && (
            <div className="mb-3 text-red-600">{error}</div>
          )}

          <div className="flex items-center gap-4">
            <input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={loading || isTyping || !currentSession || !!error}
              className="flex-1 w-full bg-gray-100 dark:bg-gray-800 border-none rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary disabled:opacity-60"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!currentMessage.trim() || loading || isTyping}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white flex-shrink-0 disabled:opacity-60"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
              ) : (
                <span className="material-symbols-outlined">send</span>
              )}
            </button>
          </div>
        </div>

      </div>

      <style>{`
        .typing-indicator span { width:6px; height:6px; border-radius:9999px; }
        .delay-150{ animation-delay:0.15s }
        .delay-300{ animation-delay:0.3s }
      `}</style>
    </div>
  );
}
