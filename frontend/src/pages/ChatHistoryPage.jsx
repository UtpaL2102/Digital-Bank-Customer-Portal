import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { getAuthToken } from '../lib/authHelpers';
import { 
  Alert, Button, Spinner, Card, Table, Form, 
  InputGroup, Row, Col 
} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ChatHistoryPage = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confidenceThreshold, setConfidenceThreshold] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    hasMore: true
  });

  const navigate = useNavigate();
  const token = getAuthToken();

  // Initial data fetch
  useEffect(() => {
    fetchChatHistory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Refetch when date filters change
  useEffect(() => {
    if (startDate || endDate) {
      fetchChatHistory(false);
    }
  }, [startDate, endDate]);

  const fetchChatHistory = async (isLoadMore = false) => {
    const loadingSetter = isLoadMore ? setLoadingMore : setLoading;
    try {
      loadingSetter(true);
      setError(null);

      const params = {
        page: isLoadMore ? pagination.page + 1 : 1,
        limit: pagination.limit
      };

      if (startDate) params.startDate = startDate.toISOString();
      if (endDate) params.endDate = endDate.toISOString();

      const response = await api.chatbot.getHistory(params, token);
      
      setChatHistory(prev => 
        isLoadMore ? [...prev, ...response.data] : response.data
      );
      
      setPagination(prev => ({
        ...prev,
        page: isLoadMore ? prev.page + 1 : 1,
        hasMore: response.hasMore
      }));
    } catch (err) {
      if (err.type === 'AUTH_ERROR') {
        navigate('/login');
      } else {
        setError('Failed to fetch chat history. Please try again.');
      }
    } finally {
      loadingSetter(false);
    }
  };

  // Filter chat history based on search term and confidence
  const filteredHistory = chatHistory.filter(session => {
    const matchesSearch = searchTerm === '' || 
      session.messages.some(msg => 
        msg.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesConfidence = confidenceThreshold === '' ||
      session.messages.some(msg => 
        msg.confidence_score >= parseFloat(confidenceThreshold)
      );

    return matchesSearch && matchesConfidence;
  });

  const handleConfidenceChange = (e) => {
    const value = e.target.value;
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 1)) {
      setConfidenceThreshold(value);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setConfidenceThreshold('');
    setStartDate(null);
    setEndDate(null);
    fetchChatHistory();
  };

  if (loading) {
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
      <Card>
        <Card.Header>
          <h4>Chat History</h4>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <Row className="mb-4">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Search Messages</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search in messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label>Min. Confidence</Form.Label>
                <Form.Control
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  placeholder="0.0-1.0"
                  value={confidenceThreshold}
                  onChange={handleConfidenceChange}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={setStartDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  maxDate={new Date()}
                  className="form-control"
                  placeholderText="Select start date"
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={setEndDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  maxDate={new Date()}
                  className="form-control"
                  placeholderText="Select end date"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-3">
            <Button variant="outline-secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
            <span className="ms-3">
              Showing {filteredHistory.length} results
            </span>
          </div>

          {filteredHistory.length === 0 ? (
            <Alert variant="info">
              No chat history found matching your criteria.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Confidence</th>
                  <th>Sources</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((session) => {
                  // Group messages into Q&A pairs
                  const messagePairs = [];
                  for (let i = 0; i < session.messages.length - 1; i++) {
                    const current = session.messages[i];
                    const next = session.messages[i + 1];
                    if (current.role === 'user' && next.role === 'assistant') {
                      messagePairs.push({ question: current, answer: next });
                      i++; // Skip the next message since we've used it
                    }
                  }

                  return messagePairs.map(({ question, answer }, pairIndex) => (
                    <tr key={`${session.id}-${pairIndex}`}>
                      <td>{new Date(answer.timestamp).toLocaleDateString()}</td>
                      <td>{question.content}</td>
                      <td>{answer.content}</td>
                      <td>
                        <span className={`badge ${
                          answer.confidence_score >= 0.8 ? 'bg-success' :
                          answer.confidence_score >= 0.6 ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {Math.round(answer.confidence_score * 100)}%
                        </span>
                      </td>
                      <td>
                        <small>
                          {answer.metadata?.sources?.join(', ') || 'N/A'}
                        </small>
                      </td>
                    </tr>
                  ));
                })}
              </tbody>
            </Table>
          )}

          {pagination.hasMore && (
            <div className="text-center mt-3">
              <Button
                variant="primary"
                onClick={() => fetchChatHistory(true)}
                disabled={loadingMore}
              >
                {loadingMore ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ChatHistoryPage;
