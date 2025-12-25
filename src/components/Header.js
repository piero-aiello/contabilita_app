import React, { useState, useRef } from 'react';
import { Navbar, Nav, Button, Modal, Form, Container, Badge } from 'react-bootstrap';
import CategoryManagementModal from './CategoryManagementModal';
import { useLanguage } from '../i18n/LanguageContext';

const Header = ({ balance, setBalance, setTransactions, onLogout, expenseCategories, incomeCategories, deleteCategory, editCategory }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const fileInputRef = useRef(null);

  const handleDeposit = () => {
    setBalance(prev => prev + parseFloat(amount));
    setShowDepositModal(false);
    setAmount(0);
  };

  const handleEditBalance = () => {
    setBalance(parseFloat(amount));
    setShowEditModal(false);
    setAmount(0);
  };

  const handleExport = () => {
    const data = {
      balance,
      transactions: JSON.parse(localStorage.getItem('contabilita-transactions')) || []
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "accounting_data.json";
    link.click();
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data && typeof data.balance === 'number' && Array.isArray(data.transactions)) {
          setBalance(data.balance);
          setTransactions(data.transactions);
        } else {
          alert(t('invalidJsonFile'));
        }
      } catch (error) {
        alert(t('errorParsingJson'));
      }
    };
    reader.readAsText(file);
    event.target.value = null;
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">{t('appName')}</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="align-items-center">
              <Button 
                variant="outline-light" 
                size="sm" 
                onClick={toggleLanguage} 
                className="me-2"
                style={{ minWidth: '60px' }}
              >
                {language === 'en' ? '🇮🇹 IT' : '🇬🇧 EN'}
              </Button>
              <Button variant="success" onClick={() => setShowDepositModal(true)} className="me-2">{t('deposit')}</Button>
              <Button variant="warning" onClick={() => setShowEditModal(true)} className="me-2">{t('editBalance')}</Button>
              <Button variant="info" onClick={handleExport} className="me-2">{t('exportJson')}</Button>
              <Button variant="outline-info" onClick={handleImportClick} className="me-3">{t('importJson')}</Button>
              <Button variant="danger" onClick={onLogout} className="me-2">{t('logout')}</Button>
              <Button variant="secondary" onClick={() => setShowCategoryModal(true)}>{t('manageCategories')}</Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImport}
                className="d-none"
                accept=".json"
              />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="position-sticky top-0 bg-light shadow-sm py-3 mb-4" style={{ zIndex: 1020 }}>
        <Container className="text-center">
          <h2>{t('currentBalance')}</h2>
          <h1>
            <Badge bg={balance >= 0 ? 'primary' : 'danger'}>
              {balance.toLocaleString(language === 'it' ? 'it-IT' : 'en-US', { style: 'currency', currency: 'EUR' })}
            </Badge>
          </h1>
        </Container>
      </div>

      {/* Deposit Modal */}
      <Modal show={showDepositModal} onHide={() => setShowDepositModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('makeDeposit')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t('amountToDeposit')}</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDepositModal(false)}>{t('cancel')}</Button>
          <Button variant="primary" onClick={handleDeposit}>{t('confirm')}</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Balance Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t('editBalanceTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{t('newBalance')}</Form.Label>
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>{t('cancel')}</Button>
          <Button variant="primary" onClick={handleEditBalance}>{t('set')}</Button>
        </Modal.Footer>
      </Modal>

      <CategoryManagementModal
        show={showCategoryModal}
        onHide={() => setShowCategoryModal(false)}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        deleteCategory={deleteCategory}
        editCategory={editCategory}
      />
    </>
  );
};

export default Header;
