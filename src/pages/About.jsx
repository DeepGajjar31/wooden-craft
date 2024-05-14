// AboutPage.js
import React from 'react';
import '../styles/about.css'

import Helmet from '../components/Helmet/Helmet'
import CommonSection from '../UI/CommonSection'

const AboutPage = () => {
  return <Helmet title="About">
    <CommonSection title="About" />
    <div className="about-page">
      <h2 className='text-center mt-10'>Wooden Craft</h2>
      <h5 className='text-center'>Welcome to our furniture showroom!</h5>
      <p className='about-p'>Our showroom has been serving customers for over a decade, providing high-quality furniture for homes and offices. At our showroom, we strive to offer a wide range of furniture options to suit every taste and budget. Whether you're looking for classic designs or modern styles, we've got you covered. Our team of experienced professionals is dedicated to providing excellent customer service and helping you find the perfect furniture pieces for your space. Visit our showroom today to explore our latest collections and experience the beauty and comfort of our furniture firsthand.</p>
      <p className='about-p'>What We Offer
        <p className='about-p lst'>
          Exclusive Collections: Discover furniture that spans a range of styles and eras, each piece handpicked for its craftsmanship, beauty, and functionality. From statement-making dining tables to elegant bedroom sets, our collections are designed to cater to diverse tastes and spaces.
        </p>
        <p className='about-p lst'>
          Sustainability at Heart: Sustainability isn't just a buzzword for us; it's woven into the fabric of our operations. We prioritize materials and processes that are kind to the earth, ensuring that our furniture not only looks good but also does good.
        </p>
        <p className='about-p lst'>
          Custom Creations: Your home is a reflection of your unique style, and we celebrate that. Wooden Craft offers bespoke furniture services, allowing you to tailor dimensions, finishes, and materials to your exact specifications. Dream it, and we'll craft it.

        </p>
        <p className='about-p lst'>
          Virtual Showroom Experience: Step into our virtual showroom from the comfort of your home. Explore our collections through high-resolution imagery, detailed descriptions, and interactive online consultations. Our expert advisors are here to guide you, ensuring your furniture choice fits your space perfectly.

        </p>
        <p className='about-p lst'>
          Seamless Shopping Experience: With an intuitive online platform, secure payment gateways, and dedicated customer service, shopping for furniture online has never been easier or more reassuring.</p>
      </p>
      <p className='about-p'>
        Our Commitment
        <p className="aboutp lst">
        At Wooden Craft, your satisfaction is our masterpiece. We are committed to providing an unparalleled shopping experience, ensuring the quality of every piece, and delivering excellence right to your doorstep. Our vision extends beyond furniture—we aim to enrich lives through designs that inspire and endure.
        </p>
      </p>

    </div>
  </Helmet>

};

export default AboutPage;
