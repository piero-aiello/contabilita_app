import React, { useState } from 'react';
import { Modal, Button, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const CategoryManagementModal = ({ show, onHide, expenseCategories, incomeCategories, deleteCategory, editCategory }) => {
  const { t } = useLanguage();
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleEditClick = (type, category) => {
    setEditingCategory({ type, name: category });
    setNewCategoryName(category);
  };

  const handleSaveEdit = () => {
    if (editingCategory && newCategoryName) {
      editCategory(editingCategory.type, editingCategory.name, newCategoryName);
      setEditingCategory(null);
      setNewCategoryName('');
    }
  };

  const allCategories = [
    ...expenseCategories.map(cat => ({ name: cat, type: 'expense' })),
    ...incomeCategories.map(cat => ({ name: cat, type: 'income' }))
  ].sort((a, b) => a.name.localeCompare(b.name));

  const renderCategoryItem = (category) => (
    <ListGroup.Item key={`${category.type}-${category.name}`} className="d-flex justify-content-between align-items-center">
      {editingCategory && editingCategory.type === category.type && editingCategory.name === category.name ? (
        <InputGroup>
          <Form.Control
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <Button variant="success" onClick={handleSaveEdit}>{t('save')}</Button>
          <Button variant="secondary" onClick={() => setEditingCategory(null)}>{t('cancel')}</Button>
        </InputGroup>
      ) : (
        <>
          {category.name}
          <div>
            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditClick(category.type, category.name)}>{t('edit')}</Button>
            <Button variant="outline-danger" size="sm" onClick={() => deleteCategory(category.type, category.name)}>{t('delete')}</Button>
          </div>
        </>
      )}
    </ListGroup.Item>
  );

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{t('categoryManagement')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>{t('allCategoriesTitle')}</h5>
        <ListGroup>
          {allCategories.length > 0 ? (
            allCategories.map(renderCategoryItem)
          ) : (
            <ListGroup.Item className="text-center">{t('noCategoriesFound')}</ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>{t('close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryManagementModal;
