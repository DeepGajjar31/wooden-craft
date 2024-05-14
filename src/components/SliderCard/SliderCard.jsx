import React, { useState, useEffect, useCallback } from 'react';
import './SliderCard.css';

import banner1 from '../../assets/images/banner1.jpg';
import banner2 from '../../assets/images/banner2.jpg';
import banner3 from '../../assets/images/banner3.jpg';
import banner4 from '../../assets/images/banner4.jpg';
import additionalImage1 from '../../assets/images/obanner-1.jpg';
import additionalImage2 from '../../assets/images/obanner-2.jpg';

const SliderCard = ({ interval = 3000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slides array with imported image URLs
  const slides = [banner1, banner2, banner3, banner4];

  // Additional images array
  const additionalImages = [additionalImage1, additionalImage2];

  // Define nextSlide using useCallback
  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  }, [slides.length]);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    // Automatically advance the slider
    const intervalId = setInterval(() => {
      nextSlide();
    }, interval);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, [interval, nextSlide]); // Include nextSlide in the dependency array

  return (
    <div className="SliderContainer">
      <div className="image-slider-container">
        <div className="image-slider">
          <div className="slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
            {slides.map((slide, index) => (
              <img key={index} src={slide} alt={`Slide ${index + 1}`} />
            ))}
          </div>
          <button className="prev-button" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next-button" onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </div>
      <div className="additional-images">
        {additionalImages.map((image, index) => (
          <img key={index} src={image} alt={`Additional ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default SliderCard;
