import React from 'react'
import "./../home/home.css"
import doctors1 from "./../../images/doctors1.png";
import consultorio from "./../../images/consultorio.jpg";
export const Home = () => {
  
  return (
    <>
      <div>
      </div>
      <div className='doctorsContainer'>
        <figure className='doctorImgOp1 doctorImgContainer'>
          <img src= {doctors1} alt="" />
        </figure>
        <figure className='doctorImgOp2'>
          <img src= {consultorio} alt="" />
        </figure>
      </div>

    </>

  )
}
