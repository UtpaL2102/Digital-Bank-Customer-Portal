import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';
import { Alert, Button, Spinner, Card } from 'react-bootstrap';

const ChatbotSupportPage = () => {
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
    'How do I reset my password?'
  ]);

  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const token = getAuthToken();

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat session
  useEffect(() => {
    const initializeChat = async () => {
      try {
        const session = await api.chatbot.createSession({
          title: 'Customer Support Chat'
        }, token);
        setCurrentSession(session);
        setInitialLoading(false);
      } catch (err) {
        if (err.type === 'AUTH_ERROR') {
          navigate('/login');
        } else {
          setError('Failed to initialize chat session. Please try again.');
        }
        setInitialLoading(false);
      }
    };

    initializeChat();
  }, [navigate, token]);

  // Handle sending messages
  const handleSendMessage = async (messageText = currentMessage) => {
    if (!messageText.trim()) return;
    
    if (!currentSession?.id) {
      setError("Chat session not ready. Please refresh.");
      return;
    }

    const userMessage = {
      content: messageText,
      role: 'user',
      timestamp: new Date().toISOString()
    };

    try {
      setLoading(true);
      setError(null);
      setMessages(prev => [...prev, userMessage]);
      setCurrentMessage('');
      setIsTyping(true);

      // Save user message to session
      await api.chatbot.saveMessage(String(currentSession.id), userMessage, token);

      // Get bot response
      const response = await api.chatbot.sendMessage({ 
        message: messageText.trim() 
      }, token);

      // Map API response fields according to contract
      const { reply, confidence_score, sources } = response;
      const botMessage = {
        content: reply,
        role: 'assistant',
        confidence_score,
        metadata: { sources },
        timestamp: new Date().toISOString()
      };

      // Save bot message to session
      await api.chatbot.saveMessage(String(currentSession.id), botMessage, token);
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      if (err.type === 'AUTH_ERROR') {
        navigate('/login');
      } else {
        setError('Failed to send message. Please try again.');
      }
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (initialLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card className="chat-container">
        <Card.Header>
          <h4>Digital Bank Support</h4>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <div className="messages-container" style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {msg.content}
                  {msg.confidence_score && (
                    <small className={`confidence-score ${
                      msg.confidence_score >= 0.8 ? 'text-success' :
                      msg.confidence_score >= 0.6 ? 'text-warning' : 'text-danger'
                    }`}>
                      Confidence: {Math.round(msg.confidence_score * 100)}%
                    </small>
                  )}
                  <small className="timestamp">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </small>
                </div>
                {msg.metadata?.sources && (
                  <div className="sources">
                    <small>Sources: {msg.metadata.sources.join(', ')}</small>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="bot-message">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="suggestions mt-3">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline-primary"
                size="sm"
                className="me-2 mb-2"
                onClick={() => handleSendMessage(suggestion)}
                disabled={loading || isTyping || !currentSession || error}
              >
                {suggestion}
              </Button>
            ))}
          </div>

          <div className="input-container mt-3">
            <textarea
              className="form-control"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              rows="3"
              disabled={loading || isTyping || !currentSession || error}
            />
            <Button
              variant="primary"
              className="send-button mt-2"
              onClick={() => handleSendMessage()}
              disabled={!currentMessage.trim() || loading || isTyping}
            >
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                'Send'
              )}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatbotSupportPage;

