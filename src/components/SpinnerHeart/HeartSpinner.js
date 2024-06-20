import React from 'react'
import './spinner2.css'
function HeartSpinner() {
  return (
    <div>
    <p className='my_p'>Loading...</p>
    {/* <div class="spinner-heart" style={{fontStyle:'normal',fontFamily:'initial'}}> */}
    <div class="container_heart">
      <div class="preloader">
        <span></span>
        <span></span>
        <span></span>
      </div>
{/* <div class="shadow">
</div> */}
</div>
    {/* </div> */}


    </div> 

  )
}

export default HeartSpinner