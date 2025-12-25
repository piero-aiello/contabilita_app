import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const TransactionSummary = ({ transactions }) => {
  const { t, language } = useLanguage();

  const totalExpenses = transactions
    .filter(tr => tr.type === 'expense')
    .reduce((acc, tr) => acc + tr.amount, 0);

  const totalIncome = transactions
    .filter(tr => tr.type === 'income')
    .reduce((acc, tr) => acc + tr.amount, 0);

  const formatCurrency = (amount) => {
    return amount.toLocaleString(language === 'it' ? 'it-IT' : 'en-US', { style: 'currency', currency: 'EUR' });
  };

  return (
    <Card className="mt-4 mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{t('filteredSummary')}</Card.Title>
        <Row className="text-center mt-3">
          <Col>
            <h5>{t('totalExpenses')}</h5>
            <h3><Badge bg="danger">{formatCurrency(totalExpenses)}</Badge></h3>
          </Col>
          <Col>
            <h5>{t('totalIncome')}</h5>
            <h3><Badge bg="success">{formatCurrency(totalIncome)}</Badge></h3>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TransactionSummary;
