import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

function AddPaymentForm({ onAddPayment, onCancel, maxAmount }) {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const paymentAmount = parseFloat(amount);
    
    if (!amount || paymentAmount <= 0) {
      alert(t('enterValidAmount'));
      return;
    }

    if (paymentAmount > maxAmount) {
      alert(t('amountCannotExceed', { max: maxAmount.toFixed(2) }));
      return;
    }

    onAddPayment(paymentAmount);
    setAmount('');
  };

  const handleQuickAmount = (percentage) => {
    const quickAmount = maxAmount * (percentage / 100);
    setAmount(quickAmount.toFixed(2));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label className="small">{t('paymentAmount')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            step="0.01"
            min="0.01"
            max={maxAmount}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            size="sm"
            required
          />
          <InputGroup.Text>€</InputGroup.Text>
        </InputGroup>
      </Form.Group>
      
      <div className="mb-2">
        <div className="small text-muted mb-1">{t('quickPayments')}:</div>
        <div className="d-flex gap-1 flex-wrap">
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={() => handleQuickAmount(25)}
          >
            25%
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={() => handleQuickAmount(50)}
          >
            50%
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            type="button"
            onClick={() => handleQuickAmount(100)}
          >
            100%
          </Button>
        </div>
      </div>
      
      <div className="d-flex gap-2">
        <Button variant="success" size="sm" type="submit" className="flex-grow-1">
          {t('pay')}
        </Button>
        <Button variant="secondary" size="sm" type="button" onClick={onCancel}>
          {t('cancel')}
        </Button>
      </div>
      
      <div className="small text-muted mt-1">
        {t('max')}: €{maxAmount.toFixed(2)}
      </div>
    </Form>
  );
}

export default AddPaymentForm;
