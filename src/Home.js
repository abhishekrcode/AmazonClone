import React from 'react'
import "./Home.css";
import Product from './Product';

function Home() {
  return (
    <div className='home'>
        <div className='home__container'> 
        <img
            className="home__image"
            // src='https://socialmarketingwriting.com/wp-content/uploads/2012/07/amazon-facebook-cover.jpg'
            src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
            alt=''
        />

        <div className='home__row'>
        {/* Product */}
        {/* Product */}
        <Product
            id="1234322"
            title="Apple Macbook Pro"
            price={122000}
            image="https://duet-cdn.vox-cdn.com/thumbor/0x0:2040x1360/828x552/filters:focal(1020x680:1021x681):format(webp)/cdn.vox-cdn.com/uploads/chorus_asset/file/7390261/vpavic_161031_1256_0264.0.jpg"
            rating={5}
        />
        <Product
            id="1234323"
            title="American Tourister 32 Ltrs Black Casual Backpack (AMT FIZZ SCH BAG 02 - BLACK)"
            price={1099.00}
            image="https://m.media-amazon.com/images/I/81KEKEDFUcL._SL1500_.jpg"
            rating={5}

        />

        </div>

        <div className='home__row'>
        {/* Product */}
        {/* Product */}
        {/* Product */}
        <Product
            id="1234324"
            title="American Tourister 32 Ltrs Black Casual Backpack (AMT FIZZ SCH BAG 02 - BLACK)"
            price={24448.00}
            image="https://m.media-amazon.com/images/I/81vDZyJQ-4L._SL1500_.jpg"
            rating={5}
        />
        <Product
           id="1234325"
            title="American Tourister 32 Ltrs Black Casual Backpack (AMT FIZZ SCH BAG 02 - BLACK)"
            price={24448.00}
            image="https://m.media-amazon.com/images/I/81vDZyJQ-4L._SL1500_.jpg"
            rating={5}
        />
        <Product
           id="1234326"
            title="American Tourister 32 Ltrs Black Casual Backpack (AMT FIZZ SCH BAG 02 - BLACK)"
            price={24448.00}
            image="https://m.media-amazon.com/images/I/81vDZyJQ-4L._SL1500_.jpg"
            rating={5}
        />

        </div>

        <div className='home__row'>
        {/* Product */}
        <Product
           id="12343267"
            title="Lover"
            price={448.00}
            image="https://m.media-amazon.com/images/I/71RfNE3rIyL._SL1500_.jpg"
            rating={5}
        />

        </div>
        
        
        </div>
      
    </div>
  )
}

export default Home
