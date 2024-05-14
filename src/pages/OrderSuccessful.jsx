import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Link } from 'react-router-dom';
import '../styles/OrderSuccessful.css'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const OrderSuccessful = () => {
  return <Helmet title='Order Status'>
    {/* <CommonSection title='Order Status' /> */}
    <div className="os-maincon">
      <div style={{ textAlign: 'center' }} className='right-icon'>
        <IoMdCheckmarkCircleOutline />
      </div>
      <div class="bg-white p-6  md:mx-auto ">
        <div class="text-center">
          <h2 class="md:text-2xl text-base text-gray-900 font-semibold text-center">Payment Done!</h2>
          <p class="text-gray-600 my-2">Thank you for completing your secure online payment.</p>
          <p> Have a great day!  </p>
          <div class="py-10 text-center">
            <Link to="/" class="px-12 bg-red-600 hover:bg-red-500 text-white font-semibold py-3">
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  </Helmet>
}

export default OrderSuccessful