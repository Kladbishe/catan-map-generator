import React, { type ReactNode } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './Carousel.css'

interface CarouselProps {
  slides: ReactNode[];
  options?: {
    loop?: boolean;
    align?: 'start' | 'center' | 'end';
  };
}

export const Carousel: React.FC<CarouselProps> = ({ slides, options = { loop: true } }) => {

  const [emblaRef] = useEmblaCarousel(options)

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {slides.map((slide, index) => (
          <div className="embla__slide" key={index}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  )
}
