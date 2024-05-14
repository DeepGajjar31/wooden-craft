import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';

import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import useGetData from '../custom-hooks/useGetData';

const Contact = () => {
  const { data: usersData } = useGetData('users');
  const currentUser = usersData && usersData.length > 0 ? usersData[0] : null;
  const [mobile, setMobile] = useState('');
  const [formData, setFormData] = useState({
    subject: '', message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mergedData = {
      ...formData,
      name: currentUser ? currentUser.displayName : 'N/A',
      email: currentUser ? currentUser.email : 'N/A',
      mobile: mobile || (currentUser && currentUser.mobile ? currentUser.mobile : 'N/A')
    };

    if (formData.subject.trim() !== '' && formData.message.trim() !== '') {
      console.log(mergedData);
      alert("Your Feedback Has Been Sent!");
      setFormData({ subject: '', message: '' });
      setMobile('');
      
      // Define options for the fetch call
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: mergedData.name,
          phone: mergedData.mobile,
          subject: mergedData.subject,
          message: mergedData.message
        })
      };

      // Make the fetch call
      fetch('https://wooden-craft-6a404-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json', options)
        .then(response => {
          if (response.ok) {
            alert("Message sent");
          } else {
            alert("Error occurred");
          }
        })
        .catch(error => {
          console.error('Error:', error);
          alert("Error occurred");
        });
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col className='contact-info'>
              <div className="contact-item">
                <i><IoMail /></i>
                <h5>Mail</h5>
                <a href="mailto:woodencraft@gmail.com">WoodenCraft@gmail.com</a>
              </div>
              <div className="contact-item">
                <i><FaMapLocationDot /></i>
                <h5>Address</h5>
                <a href="https://www.google.com/maps/place/Ahmedabad,Gujrat" target="_blank" rel="noopener noreferrer">Ahmedabad, Gujarat</a>
              </div>
              <div className="contact-item">
                <i><FaPhone /></i>
                <h5>Phone</h5>
                <span>356-245-2940</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col>
              <form className='contact-form' onSubmit={handleSubmit}>
                {currentUser && (
                  <>
                    <p>{currentUser.displayName}</p>
                    <p>{currentUser.email}</p>
                    <p>{currentUser.mobile || (
                      <input
                        type="tel"
                        placeholder="Enter your mobile number"
                        className="w-100"
                        maxLength="10"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      />
                    )}</p>
                  </>
                )}
                <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
                <textarea name="message" placeholder="Message" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                <button type="submit">Send Feedback</button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Contact;
