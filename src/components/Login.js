import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import PasswordReset from './PasswordReset';
import { useLanguage } from '../i18n/LanguageContext';

const Login = ({ onLogin }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedPassword = localStorage.getItem('contabilita-user-password');
    
    if (password === storedPassword) {
      onLogin();
    } else {
      setError(t('wrongPassword'));
      setPassword('');
    }
  };

  const handlePasswordReset = () => {
    setError('');
    setPassword('');
  };

  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={5}>
            <div className="text-end mb-3">
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={toggleLanguage}
              >
                {language === 'en' ? '🇮🇹 Italiano' : '🇬🇧 English'}
              </Button>
            </div>
            <Card>
              <Card.Body>
                <Card.Title className="text-center mb-4">{t('protectedAccess')}</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('password')}</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('enterPassword')}
                      autoFocus
                    />
                  </Form.Group>
                  {error && <Alert variant="danger">{error}</Alert>}
                  <Button variant="primary" type="submit" className="w-100 mb-3">
                    {t('login')}
                  </Button>
                </Form>
                
                <hr className="my-3" />
                <div className="text-center">
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => setShowResetModal(true)}
                    className="w-100"
                  >
                    🔑 {t('resetPassword')}
                  </Button>
                  <small className="text-muted d-block mt-1">
                    {t('forAdmins')}
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <PasswordReset
          show={showResetModal}
          onHide={() => setShowResetModal(false)}
          onPasswordReset={handlePasswordReset}
        />
      </Container>
    </div>
  );
};

export default Login;
