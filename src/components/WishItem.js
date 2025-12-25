import React, { useState } from 'react';
import { Card, Badge, Button, ProgressBar } from 'react-bootstrap';
import AddPaymentForm from './AddPaymentForm';
import { useLanguage } from '../i18n/LanguageContext';

function WishItem({ wish, onAddPayment, onDelete, onDeleteWithRefund, onDeletePayment }) {
  const { t, language } = useLanguage();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const totalPaid = wish.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remaining = Math.max(0, wish.price - totalPaid);
  const progressPercentage = (totalPaid / wish.price) * 100;
  const isCompleted = totalPaid >= wish.price;

  const getDesireLevelText = (level) => {
    switch(level) {
      case 1: return t('low');
      case 2: return t('medium');
      case 3: return t('high');
      case 4: return t('veryHigh');
      case 5: return t('essential');
      default: return t('low');
    }
  };

  const getDesireLevelColor = (level) => {
    switch(level) {
      case 1: return 'secondary';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'danger';
      case 5: return 'dark';
      default: return 'secondary';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleAddPayment = (amount) => {
    const success = onAddPayment(wish.id, amount);
    if (success) {
      setShowPaymentForm(false);
    }
  };

  const handleDelete = () => {
    if (totalPaid > 0) {
      if (window.confirm(t('confirmDeleteWish', { name: wish.name, amount: totalPaid.toFixed(2) }))) {
        onDeleteWithRefund(wish.id, totalPaid);
      }
    } else {
      if (window.confirm(t('confirmDeleteWishSimple', { name: wish.name }))) {
        onDelete(wish.id);
      }
    }
  };

  const handleDeletePayment = (paymentId, amount, date) => {
    if (window.confirm(t('confirmDeletePayment', { amount: amount.toFixed(2), date: formatDate(date) }))) {
      onDeletePayment(wish.id, paymentId, amount);
    }
  };

  return (
    <Card className={`h-100 shadow-sm border-0 ${isCompleted ? 'border-success shadow' : ''}`} 
          style={{ 
            borderRadius: '12px', 
            overflow: 'hidden',
            transition: 'all 0.2s ease-in-out',
            background: isCompleted ? 'linear-gradient(135deg, #f8f9fa 0%, #e9f7ef 100%)' : '#ffffff'
          }}>
      <Card.Header className={`d-flex justify-content-between align-items-start border-0 ${
        isCompleted ? 'bg-success bg-opacity-10' : 'bg-light bg-opacity-50'
      }`} style={{ borderRadius: '12px 12px 0 0' }}>
        <div className="flex-grow-1">
          <h6 className="mb-2 fw-bold text-dark">✨ {wish.name}</h6>
          <div className="d-flex gap-2">
            <Badge 
              bg={getDesireLevelColor(wish.desireLevel)} 
              className="px-2 py-1"
              style={{ fontSize: '0.75rem', borderRadius: '6px' }}
            >
              {getDesireLevelText(wish.desireLevel)}
            </Badge>
            {isCompleted && (
              <Badge 
                bg="success" 
                className="px-2 py-1"
                style={{ fontSize: '0.75rem', borderRadius: '6px' }}
              >
                ✓ {t('completedBadge')}
              </Badge>
            )}
          </div>
        </div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleDelete}
          className="border-0 rounded-circle"
          style={{ 
            width: '30px', 
            height: '30px', 
            padding: '0',
            opacity: 0.7,
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '1'}
          onMouseLeave={(e) => e.target.style.opacity = '0.7'}
        >
          ×
        </Button>
      </Card.Header>
      
      <Card.Body className="d-flex flex-column p-4">
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">{t('targetPrice')}</span>
            <span className="fw-bold text-primary fs-6">€{wish.price.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="text-muted small">{t('paid')}</span>
            <span className="fw-semibold text-success">€{totalPaid.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted small">{t('remaining')}</span>
            <span className="fw-semibold text-warning">€{remaining.toFixed(2)}</span>
          </div>
          
          <ProgressBar 
            now={progressPercentage} 
            variant={isCompleted ? 'success' : 'primary'}
            className="mb-2"
            style={{ 
              height: '8px', 
              borderRadius: '4px',
              backgroundColor: '#e9ecef'
            }}
          />
          <div className="text-center">
            <small className="text-muted fw-medium">{Math.round(progressPercentage)}% {t('completed')}</small>
          </div>
        </div>

        {wish.link && (
          <div className="mb-3">
            <a 
              href={wish.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm w-100"
              style={{ 
                borderRadius: '8px',
                borderColor: '#e3f2fd',
                color: '#1976d2',
                backgroundColor: '#fafafa',
                transition: 'all 0.2s'
              }}
            >
              🔗 {t('viewProduct')}
            </a>
          </div>
        )}

        {wish.payments.length > 0 && (
          <div className="mb-3">
            <h6 className="text-muted small mb-2">{t('recentPayments')}</h6>
            <div className="bg-light rounded p-2" style={{ borderRadius: '8px' }}>
              {wish.payments
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3)
                .map(payment => (
                <div key={payment.id} className="d-flex justify-content-between align-items-center py-2 px-1">
                  <div className="d-flex align-items-center">
                    <span className="fw-semibold text-success me-2">€{payment.amount.toFixed(2)}</span>
                    <small className="text-muted">{formatDate(payment.date)}</small>
                  </div>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeletePayment(payment.id, payment.amount, payment.date)}
                    className="border-0 rounded-circle p-0"
                    style={{ 
                      width: '20px', 
                      height: '20px',
                      fontSize: '0.7rem',
                      opacity: 0.6,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.opacity = '1'}
                    onMouseLeave={(e) => e.target.style.opacity = '0.6'}
                  >
                    ×
                  </Button>
                </div>
              ))}
              {wish.payments.length > 3 && (
                <div className="text-center py-1">
                  <small className="text-muted">{t('andMorePayments', { count: wish.payments.length - 3 })}</small>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto">
          {!isCompleted && (
            <>
              {showPaymentForm ? (
                <AddPaymentForm
                  onAddPayment={handleAddPayment}
                  onCancel={() => setShowPaymentForm(false)}
                  maxAmount={remaining}
                />
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowPaymentForm(true)}
                  className="w-100"
                  style={{ 
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: '500',
                    background: 'linear-gradient(45deg, #007bff, #0056b3)',
                    border: 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  💰 {t('addPayment')}
                </Button>
              )}
            </>
          )}
        </div>
      </Card.Body>
      
      <Card.Footer className="bg-transparent border-0 pt-0">
        <small className="text-muted">{t('createdOn')} {formatDate(wish.createdAt)}</small>
      </Card.Footer>
    </Card>
  );
}

export default WishItem;
