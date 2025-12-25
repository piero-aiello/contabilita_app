import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const ADMIN_CODE = process.env.REACT_APP_ADMIN_CODE;

const PasswordReset = ({ show, onHide, onPasswordReset }) => {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [adminInput, setAdminInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (adminInput === ADMIN_CODE) {
      setStep(2);
      setError('');
    } else {
      setError(t('invalidAdminCode'));
      setAdminInput('');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    
    if (!newPassword.trim()) {
      setError(t('passwordEmpty'));
      return;
    }
    
    if (newPassword.length < 4) {
      setError(t('passwordMinLength'));
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError(t('passwordsNoMatch'));
      return;
    }
    
    localStorage.setItem('contabilita-user-password', newPassword);
    onPasswordReset();
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setAdminInput('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {step === 1 ? `🔑 ${t('adminAuth')}` : `🔐 ${t('resetPasswordTitle')}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 ? (
          <Form onSubmit={handleAdminAuth}>
            <Form.Group className="mb-3">
              <Form.Label>{t('adminCode')}</Form.Label>
              <Form.Control
                type="text"
                value={adminInput}
                onChange={(e) => setAdminInput(e.target.value)}
                placeholder={t('enterAdminCode')}
                autoFocus
              />
              <Form.Text className="text-muted">
                {t('codeAuthInfo')}
              </Form.Text>
            </Form.Group>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                {t('verifyCode')}
              </Button>
              <Button variant="outline-secondary" onClick={handleClose}>
                {t('cancel')}
              </Button>
            </div>
          </Form>
        ) : (
          <Form onSubmit={handlePasswordReset}>
            <Alert variant="success">
              ✅ {t('adminCodeVerified')}
            </Alert>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('newPassword')}</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t('enterNewPassword')}
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('confirmPassword')}</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('confirmNewPassword')}
              />
            </Form.Group>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <div className="d-grid gap-2">
              <Button variant="success" type="submit">
                {t('setNewPassword')}
              </Button>
              <Button variant="outline-secondary" onClick={handleClose}>
                {t('cancel')}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PasswordReset;
