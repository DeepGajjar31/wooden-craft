import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.info('Please add products to the cart.');
    }
  };

  // console.log(cartItems)

  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {cartItems.length === 0 ? (
                <h2 className='fs-4 text-center'> No item added to the cart </h2>
              ) : (
                <table className='table bordered'>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <TrList cartItems={cartItems} />
                </table>
              )}
            </Col>

            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal
                  <span className='fs-4 fw-bold'>₹ {totalAmount}</span></h6>

              </div>
              <p className='fs-6 mt-2'>taxes and shipping will calculate in checkout</p>
              <div>
                <button className="buy_btn w-100" onClick={handleCheckout}>
                  <Link to={cartItems.length > 0 ? '/checkout' : '/cart'} style={{ textDecoration: 'none', color: 'white' }}>Checkout</Link>
                </button>
                <button className="buy_btn w-100 mt-3"><Link to='/products' style={{ textDecoration: 'none', color: 'white' }}>Continue Shopping</Link></button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const TrList = ({ cartItems }) => {
  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    dispatch(cartActions.deleteItem(id));
  };

  return (
    <tbody>
      {cartItems.map((product) => (
        <tr key={product.id}>
          <td><img src={product.image} alt={product.productName} /></td>
          <td>{product.productName}</td>
          <td>{product.price}</td>
          <td>{product.quantity}</td>
          <td><button onClick={() => deleteProduct(product.id)} className='btn btn-danger'>Delete</button></td>
        </tr>
      ))}
    </tbody>
  );
};

export default Cart;
