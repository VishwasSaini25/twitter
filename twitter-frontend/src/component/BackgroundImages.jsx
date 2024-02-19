import React from 'react';
const BackgroundImages = ({ images }) => {
    const img1=require('../images/img1.avif');
    const img=require('../images/img.jpg');
    const img2=require('../images/img2.jpg');
    const img3=require('../images/img3.jpg');
    const img4=require('../images/img4.jpg');

    return (
    <div className="background-container">
        <img
          src={img1}
          className="background-image"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          alt="Background"
        />
         <img
          src={img2}
          className="background-image2"
          style={{
            position: 'absolute',
            right: '10%',
            top: '10%',
            transform: 'rotate(-10deg)'

          }}
          alt="Background"
        />
        <img
          src={img}
          className="background-image2"
          style={{
            position: 'absolute',
            left: '10%',
            top: '12%',
            transform: 'rotate(10deg)'
          }}
          alt="Background"
        />
         <img
          src={img4}
          className="background-image2"
          style={{
            position: 'absolute',
            left: '10%',
            bottom: '20%',
            transform: 'rotate(-30deg)'
          }}
          alt="Background"
        />
        <img
          src={img3}
          className="background-image2"
          style={{
            position: 'absolute',
            right: '10%',
            bottom: '22%',
            transform: 'rotate(-10deg)'
          }}
          alt="Background"
        />
    </div>
  );
};

export default BackgroundImages;
