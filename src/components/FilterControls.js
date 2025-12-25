import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import { useLanguage } from '../i18n/LanguageContext';

const FilterControls = ({ filters, setFilters, expenseCategories, incomeCategories }) => {
  const { t } = useLanguage();

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type' || name === 'period') {
      setFilters(prev => ({ ...prev, [name]: value, category: 'all' }));
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, period: 'custom', [name]: value }));
  };

  let categoryOptions = [];
  if (filters.type === 'expense') {
    categoryOptions = expenseCategories;
  } else if (filters.type === 'income') {
    categoryOptions = incomeCategories;
  } else {
    categoryOptions = [...new Set([...expenseCategories, ...incomeCategories])];
  }

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title>{t('filters')}</Card.Title>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('filterByType')}</Form.Label>
              <Form.Select name="type" value={filters.type} onChange={handleFilterChange}>
                <option value="all">{t('all')}</option>
                <option value="expense">{t('expensesOnly')}</option>
                <option value="income">{t('incomeOnly')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('filterByCategory')}</Form.Label>
              <Form.Select name="category" value={filters.category} onChange={handleFilterChange}>
                <option value="all">{t('allCategories')}</option>
                {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('filterByPeriod')}</Form.Label>
              <Form.Select name="period" value={filters.period} onChange={handleFilterChange}>
                <option value="all">{t('allTime')}</option>
                <option value="current_month">{t('currentMonth')}</option>
                <option value="custom">{t('customRange')}</option>
              </Form.Select>
            </Form.Group>
          </Col>
          {filters.period === 'custom' && (
            <Col md={4}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>{t('from')}</Form.Label>
                    <Form.Control type="date" name="startDate" value={filters.startDate} onChange={handleDateChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>{t('to')}</Form.Label>
                    <Form.Control type="date" name="endDate" value={filters.endDate} onChange={handleDateChange} />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FilterControls;
