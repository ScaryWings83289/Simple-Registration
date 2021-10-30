import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ImageContainer } from './styles';
import imageList from './images';

const CarouselContainer = () => {
  return (
    <Carousel showArrows={true} showStatus={false} autoPlay={true} showThumbs={false} infiniteLoop={true}>
      {imageList.map(image => {
        return (
          <div key={image.id}>
            <ImageContainer src={image.imageUrl} alt={image.name} />
          </div>
        );
      })}
    </Carousel>
  );
}

export default CarouselContainer;