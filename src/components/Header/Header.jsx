import React, { useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { useNavigate }from 'react-router-dom'

import './header.css';
// import { motion } from 'framer-motion';
// motion is not applying on div, span, svg element
import Logo from '../../assets/images/Logo.jpg'
import userIcon from '../../assets/images/userIcon.jpg'

import useAuth from '../../custom-hooks/useAuth'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';

const nav_links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'products',
    display: 'Products'
  },
  {
    path: 'about',
    display: 'About'
  },
  {
    path: 'contact',
    display: 'Contact'
  }
]

const Header = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const profileActionRef = useRef(null)

  const menuRef = useRef(null);
  const { currentUser } = useAuth();
  const [profileActionsVisible, setProfileActionsVisible] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      toast.success('Logged out')
      // navigate("/home");
    }).catch = (err => {
      toast.error(err.message)
    })
  }
  const myprofile = () => {
    navigate('/myprofile'); // Navigate to my profile page
  };

  const dashboard = () => {
    navigate('/dashboard');
  }

  const menuToggle = () => menuRef.current.classList.toggle('active-menu');
  // const toggleProfileActions = ()=> profileActionRef.current.classList.toggle('show_profileActions')
  const toggleProfileActions = () => {
    setProfileActionsVisible(!profileActionsVisible);
  };

  const closeProfileActions = () => {
    setProfileActionsVisible(false);
  };

  return <header className='header sticky-header'>
    <Container>
      <Row>
        <div className="nav__wrapper">
          <div className="logo">
            <img src={Logo} alt="" width={230} />
          </div>
          <div className="navigation" ref={menuRef} onClick={menuToggle}>
            <ul className="menu">
              {
                nav_links.map((item, index) => (<li className="nav_item nav_link" key={index}>
                  <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav_active" : ""} style={{ textDecoration: 'none', color: 'var(--primary-color)' }} >{item.display}</NavLink>
                </li>))
              }
            </ul>
          </div>

          <div className="nav_icons">
            <div className="user_icon" onBlur={closeProfileActions}>
              <img src={userIcon} alt="" onClick={toggleProfileActions} />
              {/* <span>{currentUser.displayName}</span> */}
              <div className={`profile-actions ${profileActionsVisible ? 'show_profileActions' : ''}`} ref={profileActionRef}>
                {currentUser ? (
                  <div>
                    <span onClick={logout}>Logout</span>
                    <div onClick={myprofile}>My Profile</div>
                    {currentUser.email === 'admin@gmail.com' && <div onClick={dashboard}>Dashboard</div>}
                  </div>
                ) : (
                  <div className='d-flex align-items-center justify-content-center flex-column'>
                    <Link to='/myprofile' style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>My Profile</Link>
                    <Link to='/signup' style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>SignUp</Link>
                    <Link to='/login' style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>Login</Link>
                    <Link to='/dashboard' style={{ textDecoration: 'none', color: 'var(--primary-color)' }}>Dashboard</Link>
                  </div>
                )}
              </div>

            </div>
            {/* <span className="fav_icon">
              <svg width="22" height="20.455" viewBox="0 0 22 20.455"><g transform="translate(0 -5.713)"><path d="M21.964,7.925c-.321-3.535-2.823-6.1-5.954-6.1a5.918,5.918,0,0,0-5.07,2.922A5.7,5.7,0,0,0,5.99,1.826C2.86,1.826.358,4.39.037,7.925a6.289,6.289,0,0,0,.187,2.318A9.942,9.942,0,0,0,3.27,15.326l7.665,6.955,7.8-6.955a9.943,9.943,0,0,0,3.046-5.083,6.3,6.3,0,0,0,.187-2.317Zm-1.011,2.124A9.092,9.092,0,0,1,18.164,14.7l-7.225,6.446L3.839,14.7a9.1,9.1,0,0,1-2.791-4.65A5.5,5.5,0,0,1,.872,8.06l.006-.043C1.153,4.92,3.3,2.672,5.99,2.672a4.96,4.96,0,0,1,4.557,3.18l.39.924.39-.924A5.112,5.112,0,0,1,16.01,2.673c2.687,0,4.837,2.248,5.118,5.385A5.489,5.489,0,0,1,20.953,10.049Z" transform="translate(0 3.887)" fill="#4a4a4a"></path></g></svg>
              <span className="no_icon">1</span>
            </span> */}
            <span className="cart_icon">
              <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                <svg width="22" height="20.165" viewBox="0 0 22 20.165"><g transform="translate(0 -5.384)"><path d="M2114.905,71.934a.482.482,0,0,0-.367-.183h-17.408l-.458-2.383c0-.183-.274-.367-.458-.367h-2.754a.459.459,0,1,0,0,.917h2.383l2.2,11.183a3.23,3.23,0,0,0,3.121,2.567H2111.7a.459.459,0,0,0,0-.917h-10.45a2.112,2.112,0,0,1-1.833-1.01l13.383-1.833a.394.394,0,0,0,.366-.365L2115,72.208a.452.452,0,0,0-.092-.275Zm-2.567,7.149-13.388,1.742-1.646-8.25H2113.9Zm-11.55,5.5a2.27,2.27,0,1,0,1.627.665A2.291,2.291,0,0,0,2100.788,84.583Zm0,3.666a1.375,1.375,0,1,1,1.375-1.375A1.41,1.41,0,0,1,2100.788,88.249Zm9.171-3.666a2.291,2.291,0,1,0,2.291,2.291,2.269,2.269,0,0,0-2.291-2.291Zm0,3.666a1.375,1.375,0,1,1,1.375-1.375A1.409,1.409,0,0,1,2109.959,88.249Z" transform="translate(-2093 -63.616)" fill="#4a4a4a"></path></g></svg>
                <span className="no_icon">{totalQuantity}</span>
                {/* <span className='i-text'>Cart</span> */}
              </NavLink>
            </span>
            <div className="mobile_menu">
              <span className="menu_icon" onClick={menuToggle}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 7.375H20.25" stroke="#515151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75 13H15.75" stroke="#515151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3.75061 18H20.25" stroke="#515151" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </span>
            </div>
          </div>

        </div>
      </Row>
    </Container>
  </header>
}

export default Header;