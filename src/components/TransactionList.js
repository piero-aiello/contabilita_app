import React from 'react';
import { Table, Badge, Button, Card } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const TransactionList = ({ transactions, deleteTransaction }) => {
  const { t, language } = useLanguage();

  const formatCurrency = (amount) => {
    return amount.toLocaleString(language === 'it' ? 'it-IT' : 'en-US', { style: 'currency', currency: 'EUR' });
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>{t('transactionHistory')}</Card.Title>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>{t('type')}</th>
              <th>{t('category')}</th>
              <th>{t('date')}</th>
              <th>{t('description')}</th>
              <th>{t('amount')}</th>
              <th>{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map(tr => (
                <tr key={tr.id} className={tr.type === 'expense' ? 'table-danger' : 'table-success'}>
                  <td>
                    <Badge bg={tr.type === 'expense' ? 'danger' : 'success'}>
                      {tr.type === 'expense' ? t('expense') : t('income')}
                    </Badge>
                  </td>
                  <td>{tr.category}</td>
                  <td>{new Date(tr.date).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US')}</td>
                  <td>{tr.description}</td>
                  <td>{formatCurrency(tr.amount)}</td>
                  <td>
                    <Button variant="outline-danger" size="sm" onClick={() => deleteTransaction(tr.id, tr.type, tr.amount)}>
                      {t('delete')}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">{t('noTransactions')}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TransactionList;
