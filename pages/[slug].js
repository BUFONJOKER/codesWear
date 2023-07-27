import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiFillStar } from 'react-icons/ai';
import { BsStarHalf } from 'react-icons/bs';
import { BsCartPlus } from 'react-icons/bs';


//slug is dynamic route
export default function Slug() {

  //router declare to get the slug
  const router = useRouter();

  //get the slug from router
  const { slug } = router.query;

  //state for zipcode
  const [zipCode, setZipCode] = useState();

  //state for delivery service available or not
  const [available, setAvailable] = useState(null)

  //state for check button clickable or not
  const [notClickable, setNotClickable] = useState(true)


  //handle zipcode input change
  const handleZipCodeInput = (e) => {

    //make check button clickable
    setNotClickable(false)

    //set the zipcode
    setZipCode(e.target.value);
  };

  //handle zipcode check button
  const handleZipCodeCheck = async () => {

    //fetch the zipcode from api
    const res = await fetch("/api/productzipcode");

    //get the data from api
    const data = await res.json();

    //check the zipcode is available or not
    //from the data in api
    if (data.includes(parseInt(zipCode))) {

      //set the available state
      setAvailable(true);

    }
    else {
      //set the available state
      setAvailable(false);
    }

  };

  return (
    <div className="d-flex justify-content-center m-5 text-white">
      <div className="card bg-black text-white"
        style={{ width: '80%', height: '1000px' }}>
        <div className="card-body">
          <Image src="/hoodies.jpg" width={100} height={200} className="card-img-top" alt="image" />
          <h1>HOODIES</h1>
          <p className="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum veritatis, placeat nesciunt aliquam facilis ut quibusdam ipsa praesentium modi maiores.</p>
          <p className="card-text"> Rs.100</p>
          <p><AiFillStar /><AiFillStar /><AiFillStar />
            <AiFillStar /><BsStarHalf /></p>
          <h3>Size</h3>
          <p>
            <button className='btn btn-primary m-1'>S</button>
            <button className='btn btn-primary m-1'>M</button>
            <button className='btn btn-primary m-1'>L</button>
            <button className='btn btn-primary m-1'>XL</button>
          </p>
          <h3>Color</h3>
          <p>
            <button className='btn btn-primary m-1'>Red</button>
            <button className='btn btn-primary m-1'>Black</button>
            <button className='btn btn-primary m-1'>Green</button>
            <button className='btn btn-primary m-1'>Blue</button>
          </p>

          <button className='btn btn-primary m-1'>Buy Now</button>
          <button className='btn btn-primary'>
            <BsCartPlus className='fs-2' /></button>

          <h3 className='mt-2'>Zip Code</h3>
          <input onChange={handleZipCodeInput}
            type="number"
            name="zipcode" id="zipcode" />

          <button onClick={handleZipCodeCheck} disabled={notClickable}
            className='btn btn-primary m-2 fw-bold rounded-pill fs-4'>
            Check</button>
          {
            available === true ? <p className='fw-bold fs-3 text-success'>Delivery service Available</p> : null
          }

          {
            available === false ? <p className='fw-bold fs-3 text-danger'>Delivery service Not Available</p> : null
          }
        </div>
      </div>
    </div>
  );
}
