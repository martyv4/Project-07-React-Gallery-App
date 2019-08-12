import React from 'react';

//displays a photo using the src input local
const Photo = ({src}) => {
    return (
        <li>
          <img src={src} alt={src} />
        </li>
    )
}

export default Photo;