import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../styles/myprofile.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../UI/CommonSection';
import useGetData from '../custom-hooks/useGetData';
import { AiOutlineUser } from "react-icons/ai";
import { db } from '../firebase.config';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import useAuth from '../custom-hooks/useAuth';

const AccountDetails = ({ user }) => (
  <div className="account-details">
    <AiOutlineUser className='user-icon' />
    <h4>Name: {user.displayName}</h4>
    <p>Email: {user.email}</p>
    <p>Mobile: {user.mobile}</p>
    <p>Address: {user.streetAddress}, {user.city}, {user.state}, {user.country}, {user.postalCode}</p>
  </div>
);

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, `users/${user.uid}/orders`);
        const q = query(ordersRef);
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-orders">
      {/* <h4>My Orders</h4> */}
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: {order.totalAmount}</p>
              <p>Items:</p>
              <ul>
                {order.cartItems.map(item => (
                  <li key={item.id}>
                    <img src={item.image} alt={item.productName} style={{ maxWidth: '100px' }} />
                    <div>
                      <p>Name: {item.productName}</p>
                      <p>Price: {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const UpdateAddress = ({ user }) => {
  const [streetAddress, setStreetAddress] = useState(user.streetAddress || '');
  const [city, setCity] = useState(user.city || '');
  const [state, setState] = useState(user.state || '');
  const [country, setCountry] = useState(user.country || '');
  const [postalCode, setPostalCode] = useState(user.postalCode || '');
  const [updating, setUpdating] = useState(false);

  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        streetAddress,
        city,
        state,
        country,
        postalCode
      });
      setUpdating(false);
    } catch (error) {
      console.error("Error updating address:", error);
      setUpdating(false);
    }
  };

  return (
    <div className="update-address">
      <form onSubmit={handleUpdateAddress}>
        <div>
          <label> Street Address: <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} /></label>
        </div>
        <div>
          <label> City: <input type="text" value={city} onChange={(e) => setCity(e.target.value)} /></label>
        </div>
        <div>
          <label> State: <input type="text" value={state} onChange={(e) => setState(e.target.value)} /> </label>
        </div>
        <div>
          <label>Country: <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} /></label>
        </div>
        <div>
          <label> Postal Code: <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} /></label>
        </div>
        <button type="submit" disabled={updating}>Update Address</button>
      </form>
    </div>
  );
};

const MyProfile = () => {
  const { currentUser } = useAuth();
  const { data: usersData, loading, error } = useGetData('users');

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }
  const user = usersData.find(userData => userData.uid === currentUser.uid); // Find the current user in the fetched users data
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <Helmet title="My Profile">
      <CommonSection title="My Profile" />
      <div className="user-profile">
        <nav>
          <ul>
            <li><Link to="">Account Details</Link></li>
            <li><Link to="myorders">My Orders</Link></li>
            <li><Link to="updateaddress">Update Address</Link></li>
          </ul>
        </nav>

        <div className="profile-content">
          <Routes>
            <Route path="" element={<AccountDetails user={user} />} />
            <Route path="myorders" element={<MyOrders user={user} />} />
            <Route path="updateaddress" element={<UpdateAddress user={user} />} />
          </Routes>
        </div>
      </div>
    </Helmet>
  );
}

export default MyProfile;