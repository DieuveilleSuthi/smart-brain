import React from "react";
import { Tilt } from 'react-tilt';
import brain from './brain.jpg';
import './Logo.css'

const Logo = () => {
    return(
        <div className="ma4 mto">
            <Tilt className='Tilt br2 shadow-2' options={{max : 55}} style={{ height: 150, width: 150 }}>
                <div className="Tilt-inner pa3"><img style={{paddindTop: '5px'}} alt='Logo' src={brain}/></div>
            </Tilt>
        </div>
    )
}

export default Logo;