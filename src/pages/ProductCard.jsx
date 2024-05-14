import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';

import { toast } from 'react-toastify';
import { IoStar, IoStarHalf } from "react-icons/io5";


const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };
  
  // const handleAddToCart = () => {
  //   addToCart(product);
  // };

  const dispatch = useDispatch()

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: product.id,
      productName: product.productName,
      price: product.price,
      image: product.imgUrl,
    }));

    toast.success('Product added successfully');

    // alert("Product added to cart");
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imgUrl}
          alt={product.name}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s ease' }}
        />
      </Link>
      <h2>{product.productName}</h2>
      <p className='desc'>{product.shortDecs  }</p>
      <div className='product-rating'>
        <div>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStar /></span>
          <span><IoStarHalf /></span>
        </div>
      </div>
      <p className='price'> Rs {product.price}</p>
      <span>
        <button className="add-to-cart-button btn" onClick={addToCart}>Add to Cart</button>
      </span>
    </div>
  );
};

export default ProductCard;
