import React from 'react'
import { Container, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'

import Logo from '../assets/images/Logo.jpg'
import userIcon from '../assets/images/userIcon.jpg'

import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { FcSettings } from "react-icons/fc";
import '../styles/adminnav.css';

// import useAuth from '../custom-hooks/useAuth';

const admin_nav = [
  {
    display: 'Dashboard',
    path: '/dashboard'
  },
  {
    display: 'All Products',
    path: '/dashboard/all-products'
  },
  {
    display: 'Add Products',
    path: '/dashboard/add-products'
  },
  {
    display: 'Orders',
    path: '/dashboard/orders'
  },
  {
    display: 'Users',
    path: '/dashboard/users'
  },
]

const AdminNav = () => {

  return (
    <>
      <header className='admin-header'>
        <div className="admin-nav-top">
          <Container>
            <div className="admin-nav-wrapper-top">
              <div className="logo">
                <img src={Logo} alt="" />
              </div>
              <div className="search_box">
                <input type="text" placeholder='Search.....' />
                <span><CiSearch /></span>
              </div>
              <div className="admin-nav-top-right">
                <span><IoNotificationsOutline /></span>
                <span><FcSettings /></span>
                {/* <svg className='user-icon' width="23.673" height="23.482" viewBox="0 0 23.673 23.482"><g transform="translate(37.837 11.741)"><path d="M23.673,11.818A11.836,11.836,0,1,0,3.831,20.556h0l.387.344H4.3l.646.473.215.129.689.43.172.086.818.43h.043a11.75,11.75,0,0,0,2.884.9h.086l.947.129h2.152l.947-.129h.086a11.75,11.75,0,0,0,2.841-.9h.086l.775-.387.172-.129.689-.43.215-.172.56-.43.129-.086.387-.344h0a11.793,11.793,0,0,0,3.831-8.651Zm-22.812,0a10.975,10.975,0,1,1,18.249,8.221l-.387-.215-3.658-1.808a.947.947,0,0,1-.516-.861V15.864l.258-.344a8.78,8.78,0,0,0,1.119-2.2,1.549,1.549,0,0,0,.9-1.42V10.355a1.549,1.549,0,0,0-.387-1.033V7.3a3.486,3.486,0,0,0-.818-2.539,4.927,4.927,0,0,0-3.788-1.334A4.95,4.95,0,0,0,8.006,4.8a3.486,3.486,0,0,0-.775,2.5V9.322a1.549,1.549,0,0,0-.387,1.033v1.506a1.549,1.549,0,0,0,.56,1.205,8.092,8.092,0,0,0,1.334,2.755v1.248a.947.947,0,0,1-.516.861l-3.4,1.851L4.477,20A10.932,10.932,0,0,1,.861,11.818Zm17.432,8.866-.473.3-.215.129-.6.344-.129.086a10.975,10.975,0,0,1-1.506.646h-.043l-.818.258h0l-.861.172H13.6l-.818.086H10.89l-.818-.086h-.043a10.933,10.933,0,0,1-1.679-.43H8.307l-.818-.3h0l-.732-.344H6.672l-.646-.43-.172-.129-.56-.387h0l3.4-1.851a1.808,1.808,0,0,0,.947-1.593V15.52l-.086-.129a7.188,7.188,0,0,1-1.291-2.669V12.55l-.129-.086a.732.732,0,0,1-.344-.6V10.355a.689.689,0,0,1,.258-.516l.129-.129V7.3h0a2.582,2.582,0,0,1,.6-1.894,4.1,4.1,0,0,1,3.185-1.076,3.851,3.851,0,0,1,3.142,1.076,2.625,2.625,0,0,1,.6,1.894V9.752l.129.129a.689.689,0,0,1,.258.516V11.9a.732.732,0,0,1-.6.646l-.215.086-.086.215A7.963,7.963,0,0,1,14.118,15l-.3.387-.086.129v1.593a1.808,1.808,0,0,0,.99,1.636l3.658,1.808h.086Z" transform="translate(-37.837 -11.741)" fill="#4a4a4a"></path></g></svg> */}
                <img src={userIcon} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>

      <section className="admin-menu p-0">
        <Container>
          <Row>
            <div className="admin-navigation">
              <ul className="admin-menu-list">
                {
                  admin_nav.map((item, index) => (
                    <li className="admin-menu-item" key={index}>
                      <NavLink to={item.path} className={navClass => navClass.isActive ? 'active-admin-menu' : ''} style={{ textDecoration: 'none' }}>{item.display}</NavLink>
                    </li>
                  ))
                }

              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default AdminNav