import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import AddWishForm from './AddWishForm';
import WishItem from './WishItem';
import { useLanguage } from '../i18n/LanguageContext';

function WishList({ balance, setBalance, addTransaction }) {
  const { t } = useLanguage();
  const [wishes, setWishes] = useState(() => {
    const savedWishes = localStorage.getItem('contabilita-wishes');
    return savedWishes ? JSON.parse(savedWishes) : [];
  });

  useEffect(() => {
    localStorage.setItem('contabilita-wishes', JSON.stringify(wishes));
  }, [wishes]);

  const addWish = (wishData) => {
    const newWish = {
      id: Date.now().toString(),
      ...wishData,
      payments: [],
      createdAt: new Date().toISOString()
    };
    setWishes(prev => [newWish, ...prev]);
  };

  const addPayment = (wishId, amount) => {
    if (balance < amount) {
      alert(t('insufficientBalancePayment'));
      return false;
    }

    const payment = {
      id: Date.now().toString(),
      amount: amount,
      date: new Date().toISOString()
    };

    setWishes(prev => prev.map(wish => 
      wish.id === wishId 
        ? { ...wish, payments: [...wish.payments, payment] }
        : wish
    ));

    setBalance(prev => prev - amount);

    const wishItem = wishes.find(w => w.id === wishId);
    addTransaction({
      id: Date.now().toString() + '_wish',
      type: 'expense',
      amount: amount,
      category: 'Wishlist',
      description: `${t('paymentFor')}: ${wishItem.name}`,
      date: new Date().toISOString().split('T')[0]
    });

    return true;
  };

  const deleteWish = (wishId) => {
    setWishes(prev => prev.filter(wish => wish.id !== wishId));
  };

  const deleteWishWithRefund = (wishId, refundAmount) => {
    const wishItem = wishes.find(w => w.id === wishId);
    
    setWishes(prev => prev.filter(wish => wish.id !== wishId));
    setBalance(prev => prev + refundAmount);
    
    addTransaction({
      id: Date.now().toString() + '_refund',
      type: 'income',
      amount: refundAmount,
      category: 'Wishlist',
      description: `${t('refundForDeletion')}: ${wishItem.name}`,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const deletePayment = (wishId, paymentId, refundAmount) => {
    const wishItem = wishes.find(w => w.id === wishId);
    
    setWishes(prev => prev.map(wish => 
      wish.id === wishId 
        ? { ...wish, payments: wish.payments.filter(payment => payment.id !== paymentId) }
        : wish
    ));
    
    setBalance(prev => prev + refundAmount);
    
    addTransaction({
      id: Date.now().toString() + '_payment_refund',
      type: 'income',
      amount: refundAmount,
      category: 'Wishlist',
      description: `${t('paymentRefund')}: ${wishItem.name}`,
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Card className="mt-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">{t('wishlist')}</h5>
      </Card.Header>
      <Card.Body>
        <AddWishForm onAddWish={addWish} />
        
        {wishes.length === 0 ? (
          <div className="text-center text-muted mt-4">
            <p>{t('noWishesYet')}</p>
          </div>
        ) : (
          <Row className="mt-4">
            {wishes.map(wish => (
              <Col key={wish.id} md={6} lg={4} className="mb-3">
                <WishItem 
                  wish={wish}
                  onAddPayment={addPayment}
                  onDelete={deleteWish}
                  onDeleteWithRefund={deleteWishWithRefund}
                  onDeletePayment={deletePayment}
                />
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
}

export default WishList;
