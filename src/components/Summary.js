import React from 'react'
import Classes from '../styles/Summary.module.css'
import image from '../assets/images/success.png'

export default function Summary() {
  return (
    <div className={Classes.summary}>
          <div className={Classes.point}>

            <p className={Classes.score}>
              Your score is <br />
              5 out of 10
            </p>
          </div>

          <div className={Classes.badge}>
            <img src={image} alt="Success" />
          </div>
        </div>
  )
}
