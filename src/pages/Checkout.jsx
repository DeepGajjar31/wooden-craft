import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../UI/CommonSection'

import { Container, Row, Col, Form, FormGroup } from "reactstrap"
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

import useGetData from '../custom-hooks/useGetData'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase.config';

const Checkout = () => {

  const { data: usersData } = useGetData('users');

  const totalQty = useSelector(state => state.cart.totalQuantity)
  const totalAmount = useSelector(state => state.cart.totalAmount)
  const currentUser = usersData && usersData.length > 0 ? usersData[0] : null;

  const [mobile, setMobile] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        mobile,
        streetAddress,
        city,
        postalCode,
        state,
        country
      };
      if (currentUser) {
        await updateDoc(doc(db, "users", currentUser.id), userData);
      } else {
        console.error("User data not found");
      }
      console.log("User data added/updated successfully");
    } catch (error) {
      console.error("Error adding/updating user data: ", error);
    }
  };

  return <Helmet title='Checkout'>
    <CommonSection title="Checkout" />
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <h6 className='mb-4 fw-bold'>Billing Information</h6>
            <Form className='billing-form'>
              <FormGroup className='form-group'>
                <p>Name : {currentUser ? currentUser.displayName : 'Loading...'}</p>
              </FormGroup>
              <FormGroup className='form-group'>
                <p>Email : {currentUser ? currentUser.email : 'Loading...'}</p>
              </FormGroup>
              <FormGroup className='form-group'>
                {currentUser && currentUser.mobile ? (
                  <p>Mobile : {currentUser.mobile}</p>
                ) : (
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="w-100"
                    maxLength="10"
                    value={mobile}
                    onChange={(e) => {
                      const value = e.target.value;
                      const cleaned = value.replace(/\D/g, '');
                      if (cleaned.length <= 10) {
                        setMobile(cleaned);
                      }
                    }}
                  />)}
              </FormGroup>
              <FormGroup className='form-group'>
                {currentUser && currentUser.streetAddress ? (
                  <p>Street Address : {currentUser.streetAddress}</p>
                ) : (
                  <input type='text' placeholder='Enter your street address' className='w-100' value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} />
                )}
              </FormGroup>
              <FormGroup className='form-group'>
                {currentUser && currentUser.city ? (
                  <p>City : {currentUser.city}</p>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your city"
                    className="w-100"
                    maxLength="20"
                    value={city}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      setCity(newValue);
                    }}
                  />)}
              </FormGroup>
              <FormGroup className='form-group'>
                {currentUser && currentUser.postalCode ? (
                  <p>Postal Code : {currentUser.postalCode}</p>
                ) : (
                  <input type='text' placeholder='Enter your postal code' className='w-100' value={postalCode}
                    onChange={(e) => {
                      const value = e.target.value;
                      const cleaned = value.replace(/\D/g, '');
                      if (cleaned.length <= 6) {
                        setPostalCode(cleaned);
                      }
                    }} />
                )}
              </FormGroup>
              <FormGroup className='form-group'>
                {currentUser && currentUser.state ? (
                  <p>State : {currentUser.state}</p>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your state"
                    className="w-100"
                    maxLength="20"
                    value={state}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      setState(newValue);
                    }}
                  />)}
              </FormGroup>
              <FormGroup className='form-group'>
                {currentUser && currentUser.country ? (
                  <p>Country : {currentUser.country}</p>
                ) : (
                  <input
                    type="text"
                    placeholder="Enter your country"
                    className="w-100"
                    maxLength="20"
                    value={country}
                    onChange={(e) => {
                      const newValue = e.target.value.replace(/[^a-zA-Z\s]/g, '');
                      setCountry(newValue);
                    }}
                  />)}
              </FormGroup>
              <button className='add-info-btn' onClick={handleFormSubmit}>Add Info</button>
            </Form>
          </Col>

          <Col lg='4'>
            <div className="checkout-cart">
              <h6>Total Qty: <span>{totalQty} items</span></h6>
              <h6>Subtotal: <span>₹{totalAmount}</span></h6>
              <h6> <span>Shipping: <br />free shipping</span> <span>₹0</span></h6>
              <h4>Total Cost: <span>₹{totalAmount}</span></h4>
              <NavLink to="/payment">
                <button className="buy_btn auth-btn w-100">Place an order</button>
              </NavLink>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Checkout