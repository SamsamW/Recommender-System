import React from 'react';

interface ImageByProps {
    src?: string;
  }

const Image: React.FC<ImageByProps> = ({ src }) => {
    return (
        <div>
            <img style={{width: '340px', height: '180px'}} src={src} />
          
        </div>
      );
  };
  
  export default Image;
  