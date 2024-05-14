import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      console.log(user)
      setLoading(false)
      toast.success('Successfully logged in')
      navigate('/home')

    } catch (error) {
      setLoading(false)
      console.error("Error signing in:", error);
      toast.error(`Login failed: ${error.message}`);
    }
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-form mt">
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Enter Your E-mail Id'
          required
        />
        <label htmlFor="password">Password:</label>
        <div className="password-container"> {/* Wrap input and icon */}
          <input
            type={showPassword ? 'text' : 'password'} // Toggle input type
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter Your Password'
            required
          />
          <span className="password-toggle" style={{ color: 'black'}} onClick={handleShowPassword}>
            {showPassword ? <BiSolidHide /> : <BiSolidShow />}
          </span>
        </div>
        <button type="submit">Login</button>
      </form>
      <p className='mt-10'>
        Don't have an account? <Link to="/signup">Create an account</Link>
      </p>
    </div>
  );
};

export default Login;