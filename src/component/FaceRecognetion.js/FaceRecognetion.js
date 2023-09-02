import React from "react";

const FaceRecognetion = ({imageUrl}) => {
    return(
        <div className="center">
            <div className="absolute mt2">
                <img alt='' src={imageUrl} width='500px' height='auto'/>
            </div>
        </div>
    )
}

export default FaceRecognetion