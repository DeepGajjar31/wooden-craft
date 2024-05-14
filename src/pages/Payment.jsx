import React, { useState } from 'react';
import '../styles/payment.css';
import { Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import useAuth from '../custom-hooks/useAuth';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function PaymentForm() {
  const [state, setState] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => state.cart.cartItems);
  const [submitted, setSubmitted] = useState(false);
  const { data: usersData } = useGetData('users');
  const auth = useAuth();
  const currentUser = auth.currentUser;
  const [expiryDate, setExpiryDate] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.cvv.length !== 3) {
      alert('Please enter a 3-digit CVV.');
      return;
    }

    const paymentData = {
      cardNumber: state.cardNumber,
      nameOnCard: state.nameOnCard,
      totalAmount: totalAmount,
      cartItems: cartItems
    };

    if (currentUser) {
      try {
        const docRef = await addDoc(collection(db, `users/${currentUser.uid}/orders`), paymentData);
        console.log("Data saved successfully with ID: ", docRef.id);
        setSubmitted(true);
      } catch (error) {
        console.error("Failed to save data", error);
      }
    } else {
      alert("No user logged in");
    }
  };

  return (
    <section>
      <Container>
        {submitted ? (
          <Row>
            <Col>
              {/* <h2>Order Successful</h2> */}
              <div className="os-maincon">
                <div style={{ textAlign: 'center' }} className='right-icon'>
                  <IoMdCheckmarkCircleOutline />
                </div>
                <div class="bg-white p-6  md:mx-auto ">
                  <div class="text-center">
                    <h2 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h2>
                    <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
                    <p> Have a great day!  </p>
                    <div class="link-btn">
                      <Link to="/" className="home-link-btn" style={{ textDecoration: 'none' }}>
                        GO BACK
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col>
              <div className="price-payment">
                <h4>Total Cost : <span>₹{totalAmount}</span></h4>
              </div>
            </Col>
            <Col>
              <div className="payment-form">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="nameOnCard">Name on Card</label>
                    <input
                      type="text"
                      id="nameOnCard"
                      name="nameOnCard"
                      value={state.nameOnCard}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                        handleChange(e);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={state.cardNumber}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                        handleChange(e);
                      }}
                      maxLength="19"
                      required
                      pattern="\d{4} \d{4} \d{4} \d{4}"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <DatePicker
                      selected={expiryDate}
                      onChange={(date) => setExpiryDate(date)}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="Select expiry date"
                      className="form-control"
                      required
                      minDate={new Date()} // Set minDate to today's date
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      value={state.cvv}
                      onChange={handleChange}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                        if (e.target.value) {
                          e.target.value = e.target.value.slice(0, 3);
                        }
                        handleChange(e);
                      }}
                      maxLength="3"
                      required
                    />
                  </div>
                  <button className='submit-payment-btn' type="submit">
                    Submit Payment
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}

export default PaymentForm;
