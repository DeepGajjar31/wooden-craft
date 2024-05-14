import React, { useEffect, useState } from 'react';
import './Home.css';
import Helmet from '../components/Helmet/Helmet';
import SliderCard from '../components/SliderCard/SliderCard';
import emiBanner from '../assets/images/emi-banner.jpg'
import icon1 from '../assets/images/icon1.jpg';
import icon2 from '../assets/images/icon2.jpg';
import icon3 from '../assets/images/icon3.jpg';
import icon4 from '../assets/images/icon4.jpg';
import icon5 from '../assets/images/icon5.jpg';
// import ProductsData from '../Data/ProductsData';
import ProductCard from './ProductCard';
import useGetData from '../custom-hooks/useGetData';

const Home = ({ addToCart }) => {
  // const products = ProductsData;

  const { data: products } = useGetData('products');

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filteredTrendingProducts = products.filter(product => product.category === "sofa");
      setTrendingProducts(filteredTrendingProducts);
    }
    if (products.length > 0) {
      const filteredNewTrendingProducts = products.filter(product =>
        product.category === "bed" || product.category === "dining-table" || product.category === "chair" || product.category === "TV-unit" || product.category === "book-shleves"
      );
      setNewArrivalProducts(filteredNewTrendingProducts);
    }
  }, [products]);


  return <Helmet title={"Home"}>
    <SliderCard />
    <div className='emiBanner'>
      <img className="lazy loading" src={emiBanner} alt="Emi Installation" width="100%" height="100%" data-was-processed="true" />
    </div>

    <div className="shop-category container-1600">
      <div className='headingnew' >Top Picks For You
        <p class="subheading">Impressive Collection for your Dream Home</p>
      </div>
      <div className="top-list">
        <a href="/products?category=sofa" style={{ textDecoration: 'none' }}>
          <img className="lazy loaded" src={icon1} alt="Wooden Sofa Set Furniture" width="100%" height="100%" />
          <p class="category-name">Sofa Sets</p>
        </a>
        <a href="/products?category=bed" style={{ textDecoration: 'none' }}>
          <img className="lazy loaded" src={icon2} alt="Wooden Sofa Set Furniture" width="100%" height="100%" />
          <p class="category-name">Beds</p>
        </a>
        <a href="/products?category=dining-table" style={{ textDecoration: 'none' }}>
          <img className="lazy loaded" src={icon3} alt="Wooden Sofa Set Furniture" width="100%" height="100%" />
          <p class="category-name">Dining Table Sets</p>
        </a>
        <a href="/products?category=TV-unit" style={{ textDecoration: 'none' }}>
          <img className="lazy loaded" src={icon4} alt="Wooden Sofa Set Furniture" width="100%" height="100%" />
          <p class="category-name">TV Units</p>
        </a>
        <a href="/products?category=book-shleves" style={{ textDecoration: 'none' }}>
          <img className="lazy loaded" src={icon5} alt="Wooden Sofa Set Furniture" width="100%" height="100%" />
          <p class="category-name">Book Sleves</p>
        </a>
      </div>
    </div>

    <div className="middle-section">
      <div className='best-seller'> Best Sellers </div>
      <div>
        <div className="products-container">
          {/* {products */}
          {/* // .filter(product => [1, 2, 3, 4].includes(product.id)) */}
          {/* // .map(product => (<ProductCard key={product.id} product={product} addToCart={addToCart} />))} */}

          {trendingProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>

      <div>
        <div className='best-seller'> New Arrivals </div>
        <div className="product-container">
          {newArrivalProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  </Helmet>
}

export default Home;
