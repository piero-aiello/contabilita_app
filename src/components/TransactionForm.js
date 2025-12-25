import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Modal, InputGroup } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const TransactionForm = ({ addTransaction, expenseCategories, incomeCategories, addCategory }) => {
  const { t } = useLanguage();
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const allCategories = [
    ...expenseCategories.map(cat => ({ name: cat, type: 'expense' })),
    ...incomeCategories.map(cat => ({ name: cat, type: 'income' }))
  ].sort((a, b) => a.name.localeCompare(b.name));

  useEffect(() => {
    if (allCategories.length > 0 && (!category || !allCategories.some(c => c.name === category))) {
      setCategory(allCategories[0].name);
      setType(allCategories[0].type);
    }
  }, [allCategories, category]);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryName = e.target.value;
    const selectedCategory = allCategories.find(cat => cat.name === selectedCategoryName);
    if (selectedCategory) {
      setCategory(selectedCategory.name);
      setType(selectedCategory.type);
    }
  };

  const handleAddCategory = () => {
    addCategory(type, newCategory);
    setCategory(newCategory);
    setShowModal(false);
    setNewCategory('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      alert(t('fillAllFields'));
      return;
    }

    addTransaction({
      id: new Date().getTime(),
      type,
      category,
      amount: parseFloat(amount),
      date,
      description,
    });

    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>{t('addNewTransaction')}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('type')}</Form.Label>
                  <Form.Select value={type} onChange={handleTypeChange}>
                    <option value="expense">{t('expense')}</option>
                    <option value="income">{t('income')}</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('category')}</Form.Label>
                  <InputGroup>
                    <Form.Select value={category} onChange={handleCategoryChange}>
                      {allCategories.map((cat, index) => <option key={`${cat.type}-${cat.name}-${index}`} value={cat.name}>{cat.name}</option>)}
                    </Form.Select>
                    <Button variant="outline-secondary" onClick={() => setShowModal(true)}>+</Button>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('amount')} (€)</Form.Label>
                  <Form.Control type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={t('placeholderAmount')} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{t('date')}</Form.Label>
                  <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>{t('description')}</Form.Label>
                  <Form.Control as="textarea" rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('placeholderDescription')} />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100">
              {t('add')}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('addNewCategory')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t('newCategoryFor')} "{type === 'expense' ? t('expense') : t('income')}"</Form.Label>
            <Form.Control
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder={t('placeholderCategory')}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>{t('cancel')}</Button>
          <Button variant="primary" onClick={handleAddCategory}>{t('saveCategory')}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TransactionForm;
