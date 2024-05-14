import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
// Note: Ensure that ProductsData is imported if it's being used or else use the fetched 'products' data from the custom hook.
// import ProductsData from '../Data/ProductsData';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../UI/CommonSection';
import { Container, Row, Col, Button } from 'reactstrap';
import { CiSearch } from "react-icons/ci";
import useGetData from '../custom-hooks/useGetData';
import { useLocation } from 'react-router-dom';

const Products = ({ addToCart }) => {
  const { data: fetchedProducts } = useGetData('products');

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [selectedFinish, setSelectedFinish] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation(); // Hook to get current URL location
  const queryParams = new URLSearchParams(location.search); // Extracting query parameters

  useEffect(() => {
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [queryParams]);

  const filteredProducts = fetchedProducts.filter(product => {
    return (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      ((selectedColor === '' || selectedColor === 'all') || product.color === selectedColor) &&
      (selectedPrice === '' || selectedPrice === 'all' || parseInt(product.price) <= parseInt(selectedPrice)) &&
      (selectedMaterial === '' || selectedMaterial === 'all' || product.material === selectedMaterial) &&
      (selectedFinish === '' || selectedFinish === 'all' || product.finish === selectedFinish) &&
      (selectedBrand === '' || selectedBrand === 'all' || product.brand === selectedBrand);
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  const handleMaterialChange = (e) => {
    setSelectedMaterial(e.target.value);
  }
  const handleFinishChange = (e) => {
    setSelectedFinish(e.target.value);
  }
  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
  const handlePriceChange = (e) => {
    setSelectedPrice(e.target.value);
  };
  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedFinish('all');
    setSelectedBrand('all');
    setSelectedColor('all');
    setSelectedPrice('all');
    setSearchTerm('');
  };  
  
  return (
    <Helmet title='Products'>
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col>
              <div className='filter-widget'>
                <select id="category" value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
                  <option value="all">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="bed">Bed</option>
                  <option value="dining-table">Dining Table</option>
                  <option value="TV-unit">TV unit</option>
                  <option value="book-shleves">Book Shleves</option>
                  <option value="wardrobe">Wardrobe</option>
                  <option value="chair">Chair</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className="filter-widget">
                <select id="material" value={selectedMaterial} onChange={handleMaterialChange}>
                  <option value="all"> Filter By Material</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Polyester spandex">Polyester spandex</option>
                  <option value="Sheesham wood">Sheesham wood</option>
                  <option value="Engineered wood">Engineered wood</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className="filter-widget">
                <select id="finish" value={selectedFinish} onChange={handleFinishChange}>
                  <option value="all">Filter By Finish</option>
                  <option value="Honey Finish">Honey Finish</option>
                  <option value="Walnut Finish">Walnut Finish</option>
                  <option value="Marroquim Finish">Marroquim</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className="filter-widget">
                <select value={selectedBrand} onChange={handleBrandChange}>
                  <option value="all">Filter By Brand</option>
                  <option value="Wooden Craft">Wooden Craft</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className='filter-widget'>
                <select id="color" value={selectedColor} onChange={handleColorChange}>
                  <option value="all">Filter By Color</option>
                  <option value="Wooden">Wooden</option>
                  <option value="Cream">Cream</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className='filter-widget'>
                <select id="price" value={selectedPrice} onChange={handlePriceChange}>
                  <option value="all">Filter By Price</option>
                  <option value="10000">Less than ₹10000</option>
                  <option value="20000">Less than ₹20000</option>
                  <option value="40000">Less than ₹40000</option>
                  <option value="50000">Less than ₹50000</option>
                </select>
              </div>
            </Col>
            <Col>
              <div className='filter-widget'>
                <select id="sort" className='sort-select'>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Col lg={{ size: 6, offset: 3 }} className='d-flex gap-4'>
        <div className="search-box text-center">
          <input type="text" placeholder='Search.....' onChange={handleSearchChange} />
          <span><CiSearch /></span>
        </div>
        <div className="text-center clear-btn">
              <Button color="danger" onClick={clearFilters}>Clear Filters</Button>
        </div>
      </Col>

      <div>
        <div className="products-container">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))
          ) : (
            <div style={{ textAlign: 'center', width: '100%', fontSize: '20px' }}>No products found!</div>
          )}
        </div>
      </div>
    </Helmet>
  );
};

export default Products;
