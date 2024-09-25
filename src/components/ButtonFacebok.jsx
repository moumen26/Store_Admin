import React from 'react'

import FacebokIcon from "../assets/icons/FacebookLight.png"
export default function ButtonFacebok() {
  return (
    <button className='buttonFacebook'>
        <img src={FacebokIcon} alt="Facebook" />
        <span className='buttonTextDark'>
            Sign In with Facebook
        </span>
    </button>
    
    
  )
}
