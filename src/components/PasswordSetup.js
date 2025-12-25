import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const PasswordSetup = ({ onPasswordSet }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!password.trim()) {
      setError(t('passwordEmpty'));
      return;
    }
    
    if (password.length < 4) {
      setError(t('passwordMinLength'));
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('passwordsNoMatch'));
      return;
    }
    
    localStorage.setItem('contabilita-user-password', password);
    onPasswordSet();
  };

  return (
    <div className="bg-primary min-vh-100 d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
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
                <Card.Title className="text-center mb-4">
                  🔐 {t('initialSetup')}
                </Card.Title>
                <Card.Text className="text-center text-muted mb-4">
                  {t('setupDescription')}
                </Card.Text>
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t('newPassword')}</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('enterYourPassword')}
                      autoFocus
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>{t('confirmPassword')}</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder={t('confirmYourPassword')}
                    />
                  </Form.Group>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Button variant="primary" type="submit" className="w-100">
                    {t('setPassword')}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PasswordSetup;
