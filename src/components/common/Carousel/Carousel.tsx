import React, { type ReactNode, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import './Carousel.css'

interface CarouselProps {
  slides: ReactNode[];
  options?: {
    loop?: boolean;
    align?: 'start' | 'center' | 'end';
  };
  onSlideChange?: (index: number) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ slides, options = { loop: true }, onSlideChange }) => {

  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    const index = emblaApi.selectedScrollSnap()
    onSlideChange?.(index)
  }, [emblaApi, onSlideChange])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

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
