import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { db } from '../firebase.config';
import { collection, getDocs, query} from 'firebase/firestore';
import '../styles/adminnav.css';


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const usersQuerySnapshot = await getDocs(collection(db, 'users'));
        const fetchedOrders = [];

        for (const userDoc of usersQuerySnapshot.docs) {
          const userData = userDoc.data();
          const paymentsQuerySnapshot = await getDocs(query(collection(db, `users/${userDoc.id}/orders`)));

          paymentsQuerySnapshot.forEach((paymentDoc) => {
            const orderData = {
              userId: userDoc.id,
              userData: userData,
              orderId: paymentDoc.id,
              ...paymentDoc.data()
            };
            fetchedOrders.push(orderData);
          });
        }

        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className='mb-4 mt-2'>All Orders</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          {orders.map(order => (
            <div className='order-main-container' key={order.orderId}>
              <h5>Order ID: {order.orderId}</h5>
              <p>User Name: {order.userData.displayName}</p>
              <p>User ID: {order.userId}</p>
              <p>Name On card: {order.nameOnCard}</p>
              <p>Card Number: {order.cardNumber}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <ul>
                {order.cartItems.map(item => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />
                    <div>
                    <p>Product ID: {item.id}</p>
                    <p>Name: {item.productName}</p>
                    <p>Price: {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Orders;
