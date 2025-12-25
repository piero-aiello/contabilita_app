import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Badge, Modal, Form } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

function RecurringExpenses({ addTransaction, balance, setBalance }) {
  const { t, language } = useLanguage();
  const [recurringItems, setRecurringItems] = useState(() => {
    const saved = localStorage.getItem('contabilita-recurring-expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [usedThisMonth, setUsedThisMonth] = useState(() => {
    const saved = localStorage.getItem('contabilita-recurring-used');
    return saved ? JSON.parse(saved) : {};
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    amount: ''
  });

  const getCurrentMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${now.getMonth()}`;
  };

  useEffect(() => {
    localStorage.setItem('contabilita-recurring-expenses', JSON.stringify(recurringItems));
  }, [recurringItems]);

  useEffect(() => {
    localStorage.setItem('contabilita-recurring-used', JSON.stringify(usedThisMonth));
  }, [usedThisMonth]);

  const handleAddItem = () => {
    if (!newItem.title.trim() || !newItem.amount || parseFloat(newItem.amount) <= 0) {
      alert(t('enterValidTitleAmount'));
      return;
    }

    const item = {
      id: Date.now().toString(),
      title: newItem.title.trim(),
      description: newItem.description.trim(),
      amount: parseFloat(newItem.amount),
      createdAt: new Date().toISOString()
    };

    setRecurringItems(prev => [item, ...prev]);
    setNewItem({ title: '', description: '', amount: '' });
    setShowAddModal(false);
  };

  const handleDeleteItem = (itemId) => {
    const item = recurringItems.find(i => i.id === itemId);
    if (window.confirm(t('confirmDeleteRecurring', { title: item.title }))) {
      setRecurringItems(prev => prev.filter(i => i.id !== itemId));
      const monthKey = getCurrentMonthKey();
      setUsedThisMonth(prev => {
        const updated = { ...prev };
        delete updated[`${itemId}-${monthKey}`];
        return updated;
      });
    }
  };

  const handleEditItem = (item) => {
    setEditingItem({
      id: item.id,
      title: item.title,
      description: item.description || '',
      amount: item.amount
    });
    setShowEditModal(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem.title.trim() || !editingItem.amount || parseFloat(editingItem.amount) <= 0) {
      alert(t('enterValidTitleAmount'));
      return;
    }

    setRecurringItems(prev => prev.map(item =>
      item.id === editingItem.id
        ? {
            ...item,
            title: editingItem.title.trim(),
            description: editingItem.description.trim(),
            amount: parseFloat(editingItem.amount)
          }
        : item
    ));

    setShowEditModal(false);
    setEditingItem(null);
  };

  const handleAddToExpenses = (item) => {
    if (balance < item.amount) {
      alert(t('insufficientBalance'));
      return;
    }

    addTransaction({
      id: Date.now().toString(),
      type: 'expense',
      category: 'Subscriptions/Recurring',
      amount: item.amount,
      description: `${item.title}${item.description ? ' - ' + item.description : ''}`,
      date: new Date().toISOString().split('T')[0]
    });

    const monthKey = getCurrentMonthKey();
    setUsedThisMonth(prev => ({
      ...prev,
      [`${item.id}-${monthKey}`]: true
    }));
  };

  const isUsedThisMonth = (itemId) => {
    const monthKey = getCurrentMonthKey();
    return usedThisMonth[`${itemId}-${monthKey}`] || false;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(language === 'it' ? 'it-IT' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getMonthlyTotal = () => {
    return recurringItems
      .filter(item => isUsedThisMonth(item.id))
      .reduce((total, item) => total + item.amount, 0);
  };

  return (
    <>
      <Card className="mt-4 shadow-sm">
        <Card.Header className="bg-warning text-dark d-flex justify-content-between align-items-center">
          <h5 className="mb-0">💳 {t('recurringExpenses')} (€{getMonthlyTotal().toFixed(2)})</h5>
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => setShowAddModal(true)}
          >
            + {t('add')}
          </Button>
        </Card.Header>
        <Card.Body>
          {recurringItems.length === 0 ? (
            <div className="text-center text-muted py-4">
              <p className="mb-0">{t('noRecurringExpenses')}</p>
              <small>{t('addSubscriptions')}</small>
            </div>
          ) : (
            <Row>
              {recurringItems.map(item => (
                <Col key={item.id} md={6} lg={4} className="mb-3">
                  <Card className={`h-100 border-0 shadow-sm ${isUsedThisMonth(item.id) ? 'bg-light' : ''}`}>
                    <Card.Body className="d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="mb-0 fw-bold text-truncate">{item.title}</h6>
                        <div className="d-flex gap-1">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditItem(item)}
                            className="border-0 rounded-circle"
                            style={{ width: '25px', height: '25px', padding: '0', fontSize: '0.7rem' }}
                            title={t('edit')}
                          >
                            ✎
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="border-0 rounded-circle"
                            style={{ width: '25px', height: '25px', padding: '0', fontSize: '0.7rem' }}
                            title={t('delete')}
                          >
                            ×
                          </Button>
                        </div>
                      </div>

                      {item.description && (
                        <p className="text-muted small mb-2">{item.description}</p>
                      )}

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold text-primary fs-5">€{item.amount.toFixed(2)}</span>
                        {isUsedThisMonth(item.id) && (
                          <Badge bg="success" className="px-2 py-1">
                            ✓ {t('addedThisMonth')}
                          </Badge>
                        )}
                      </div>

                      <div className="mt-auto">
                        <Button
                          variant={isUsedThisMonth(item.id) ? "outline-secondary" : "primary"}
                          size="sm"
                          className="w-100"
                          disabled={isUsedThisMonth(item.id)}
                          onClick={() => handleAddToExpenses(item)}
                        >
                          {isUsedThisMonth(item.id) ? t('alreadyAddedThisMonth') : t('addToExpenses')}
                        </Button>
                      </div>

                      <small className="text-muted mt-2">
                        {t('createdOn')} {formatDate(item.createdAt)}
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Add New Item Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('addRecurringExpense')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t('title')} *</Form.Label>
              <Form.Control
                type="text"
                value={newItem.title}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                placeholder={t('placeholderRecurring')}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('descriptionOptional')}</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                placeholder={t('placeholderDetails')}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>{t('amount')} (€) *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min="0.01"
                value={newItem.amount}
                onChange={(e) => setNewItem(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="0.00"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAddModal(false); setNewItem({ title: '', description: '', amount: '' }); }}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleAddItem}>
            {t('add')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Item Modal */}
      <Modal show={showEditModal} onHide={() => { setShowEditModal(false); setEditingItem(null); }}>
        <Modal.Header closeButton>
          <Modal.Title>{t('editRecurringExpense')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingItem && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{t('title')} *</Form.Label>
                <Form.Control
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={t('placeholderRecurring')}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('descriptionOptional')}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={editingItem.description}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder={t('placeholderBillingDate')}
                />
                <Form.Text className="text-muted">
                  {t('billingDateInfo')}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>{t('amount')} (€) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={editingItem.amount}
                  onChange={(e) => setEditingItem(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                  required
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowEditModal(false); setEditingItem(null); }}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleUpdateItem}>
            {t('saveChanges')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecurringExpenses;
