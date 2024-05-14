import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { IoStar, IoStarHalf } from "react-icons/io5";
import { PiShoppingCartThin } from "react-icons/pi";
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
// import { Carousel } from 'react-bootstrap';

import Helmet from '../components/Helmet/Helmet';
import useGetData from '../custom-hooks/useGetData';
import ProductCard from './ProductCard';
import CommonSection from '../UI/CommonSection';

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: products, loading } = useGetData('products'); // Make sure collection name is 'products'

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentProduct = products.find(p => p.id === productId);
    setProduct(currentProduct);
  }, [products, productId]);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: product.id,
      image: product.imgUrl,
      productName: product.productName,
      price: product.price,
      quantity: quantity,
    }));
    toast.success("Product added successfully");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = products.filter(
    item => item.category === product.category && item.id !== product.id
  ).sort(() => 0.5 - Math.random()).slice(0, 4);

  return (
    <Helmet title={product.productName}>
      <section className='pt-0'>
        <CommonSection title={product.productName} />
        <Container className='pt-4'>
          <Row>
            <Col lg="6">
              <img
                className="d-block w-100"
                src={product.imgUrl}
                alt={product.productName}
              />
              {/* <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={product.imgUrl}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel> */}
            </Col>
            <Col lg="6">
              <div className='product-details'>
                <h2>{product.productName}</h2>
                <p className='desc'>{product.shortDesc}</p>
                <div className="product-rating">
                  <div>
                    <span><IoStar /></span>
                    <span><IoStar /></span>
                    <span><IoStar /></span>
                    <span><IoStar /></span>
                    <span><IoStarHalf /></span>
                    {/* <span className='cblack'>{product.ratings}</span> */}
                  </div>
                </div>
                <p className='product-price'>Rs {product.price}</p>
                <div className='quantity'>
                  <span className='quantity-name'>Quantity</span>
                  <span className="quantity-controls">
                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                    <span className="quantity-display">{quantity}</span>
                    <button className="quantity-button" onClick={increaseQuantity}>+</button>
                  </span>
                  <span className='total-price'>Rs {product.price * quantity}</span>
                </div>
                <button className="atc-btn" onClick={addToCart}>
                  <span className='cart-icon'><PiShoppingCartThin /></span>Add to Cart
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col className='lg-12'>
              <div className="product-overview">
                <h4>Product Overview</h4>
                {/* <h6>Review({review.length})</h6> */}
              </div>
              <hr />
              <div className="overview-content">
                <p>Material : {product.material}</p>
                <p>Finish : {product.finish}</p>
                {product.designs && (
                  <p>Designs : {product.designs}</p>
                )}
                {product.color && (
                  <p>Color : {product.color}</p>
                )}
                {product.dimension && (
                  <p>Dimensions : {product.dimension}</p>
                )}
                {product.seater && (
                  <p>Seater : {product.seater}</p>
                )}
                {product.storage && (
                  <p>Storage : {product.storage}</p>
                )}
                {product.storageType && (
                  <p>Storage Type : {product.storageType}</p>
                )}
                {product.shape && (
                  <p>Shape : {product.shape}</p>
                )}
                {product.style && (
                  <p>Style : {product.style}</p>
                )}
                {product.features && (
                  <p>Features : {product.features}</p>
                )}
                {product.productQuantity && (
                  <p>Product Quantity : {product.productQuantity}</p>
                )}
                {product.armrest && (
                  <p>Armrest : {product.armrest}</p>
                )}
                {product.size && (
                  <p>Size : {product.size}</p>
                )}
                {product.productWeight && (
                  <p>Product weight : {product.productWeight}</p>
                )}
                {product.tableTopMaterial && (
                  <p>Table Top Material : {product.tableTopMaterial}</p>
                )}
                {product.chairDimension && (
                  <p>Chair Dimension : {product.chairDimension}</p>
                )}
                {product.UpholsteryFabric && (
                  <p>Upholstery Fabric : {product.UpholsteryFabric}</p>
                )}
                {product.recommendedScreenSize && (
                  <p>Recommended Screen Size : {product.recommendedScreenSize}</p>
                )}
                {product.numberOfDrawers && (
                  <p>Number of Drawers {product.numberOfDrawers}</p>
                )}
                {product.wallMounting && (
                  <p>Wall Mounting : {product.wallMounting}</p>
                )}
                {product.numberOfShleves && (
                  <p>Number of Shleves : {product.numberOfShleves}</p>
                )}
                {product.lock && (
                  <p>Lock : {product.lock}</p>
                )}
                {product.mirror && (
                  <p>Mirror : {product.mirror}</p>
                )}
                {product.numberOfDoors && (
                  <p>Number of Doors : {product.numberOfDoors}</p>
                )}
                {product.backrest && (
                  <p>Backrest : {product.backrest}</p>
                )}
                {product.upholsteryMaterial && (
                  <p>Upholstery Material : {product.upholsteryMaterial}</p>
                )}
                {product.gsm && (
                  <p>GSM : {product.gsm}</p>
                )}
                {product.content && (
                  <p>Content : {product.content}</p>
                )}
                <p>Brand : {product.brand}</p>
                <p>Warranty : {product.warranty}</p>
                <p>Ships In : {product.shipsIn}</p>
                <p>Delivery Condition : {product.deliveryCondition}</p>
                <p>Ratings : {product.ratings}</p>
              </div>
            </Col>
            <hr />
            <Col lg="12">
              <h4 className='related-title'>You might also like</h4>
              <div className="products-container">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} addToCart={addToCart} />
                  ))
                ) : (
                  <div style={{ textAlign: 'center', width: '100%', fontSize: '20px' }}>No products found!</div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
