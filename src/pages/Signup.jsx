import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { auth } from '../firebase.config'
import { db } from '../firebase.config';


const Signup = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault()
    setLoading(true)

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      // alert('Passwords do not match!');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      console.log(user);

      // Update profile here
      await updateProfile(user, { displayName: username });
      
      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
      });
      setLoading(false)
      toast.success('Account created')
      navigate('/login');
    
    } catch (error) {
      setLoading(false);
      console.error("Error signing up:", error);
      toast.error(`Signup failed: ${error.message}`);
    }
    
  };

  return <Helmet title='Signup'>
    <div className="signup-form mt">
      <h2>Signup</h2>
      <form onSubmit={signup} className='signup-main'>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={username} onChange={e => setName(e.target.value)} placeholder='Enter Your Name' required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Your E-mail Id' required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter Your Password' required />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Enter Confirm Password' required />
        <button type="submit">Signup</button>
      </form>
      <p className='mt-10'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
    </Helmet>
};

export default Signup;
