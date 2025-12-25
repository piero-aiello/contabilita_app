import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

function AddWishForm({ onAddWish }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    price: '',
    desireLevel: '1'
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert(t('enterWishName'));
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert(t('enterValidPrice'));
      return;
    }

    const wishData = {
      name: formData.name.trim(),
      link: formData.link.trim(),
      price: parseFloat(formData.price),
      desireLevel: parseInt(formData.desireLevel)
    };

    onAddWish(wishData);
    
    setFormData({
      name: '',
      link: '',
      price: '',
      desireLevel: '1'
    });
    setIsExpanded(false);
  };

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

  if (!isExpanded) {
    return (
      <div className="text-center">
        <Button 
          variant="success" 
          onClick={() => setIsExpanded(true)}
          className="mb-3"
        >
          + {t('addNewWish')}
        </Button>
      </div>
    );
  }

  return (
    <Card className="mb-3">
      <Card.Header className="bg-success text-white">
        <h6 className="mb-0">{t('newWish')}</h6>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>{t('name')} *</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t('placeholderWishName')}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>{t('price')} (€) *</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>{t('linkOptional')}</Form.Label>
                <Form.Control
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>{t('desireLevel')}</Form.Label>
                <Form.Select
                  name="desireLevel"
                  value={formData.desireLevel}
                  onChange={handleInputChange}
                >
                  <option value="1">1 - {t('low')}</option>
                  <option value="2">2 - {t('medium')}</option>
                  <option value="3">3 - {t('high')}</option>
                  <option value="4">4 - {t('veryHigh')}</option>
                  <option value="5">5 - {t('essential')}</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  {t('currentLevel')}: <span className={`badge bg-${getDesireLevelColor(parseInt(formData.desireLevel))}`}>
                    {getDesireLevelText(parseInt(formData.desireLevel))}
                  </span>
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2">
            <Button variant="success" type="submit">
              {t('addWish')}
            </Button>
            <Button 
              variant="secondary" 
              type="button"
              onClick={() => {
                setIsExpanded(false);
                setFormData({
                  name: '',
                  link: '',
                  price: '',
                  desireLevel: '1'
                });
              }}
            >
              {t('cancel')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddWishForm;
