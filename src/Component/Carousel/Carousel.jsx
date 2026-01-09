// Carousel.jsx
import React, { useState, useEffect, useRef } from 'react';
import './style.css';

export function Carousel({
  children,
  autoPlay = false,
  interval = 3000,
  slidesToShow = 1,
  slidesToScroll = 1,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  const containerRef = useRef(null);

  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const next = prev + slidesToScroll;
      return next > maxIndex ? 0 : next;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - slidesToScroll;
      return prevIndex < 0 ? maxIndex : prevIndex;
    });
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(goToNext, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, currentIndex, slidesToShow, slidesToScroll]);

  const infiniteSlides = [
    ...slides.slice(-slidesToShow),
    ...slides,
    ...slides.slice(0, slidesToShow),
  ];

  const infiniteIndex = currentIndex + slidesToShow; // offset for cloned slides
  const infiniteMaxIndex = totalSlides;

  // Handle infinite loop transition
  const handleTransitionEnd = () => {
    if (currentIndex >= infiniteMaxIndex) {
      setCurrentIndex(currentIndex - totalSlides);
    } else if (currentIndex < 0) {
      setCurrentIndex(currentIndex + totalSlides);
    }
  };

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="carousel-inner">
        {/* Previous button */}
        <button className="carousel-btn prev" onClick={goToPrev}>
          &#10094;
        </button>

        {/* Slides */}
        <div
          className="slides-wrapper"
          style={{
            transform: `translateX(-${(infiniteIndex * 100) / slidesToShow}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {infiniteSlides.map((slide, index) => (
            <div
              key={index}
              className="slide"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              {slide}
            </div>
          ))}
        </div>

        {/* Next button */}
        <button className="carousel-btn next" onClick={goToNext}>
          &#10095;
        </button>

        {/* Dots (only for main slides) */}
        <div className="dots">
          {Array.from({ length: Math.ceil(totalSlides / slidesToScroll) }).map((_, i) => (
            <span
              key={i}
              className={`dot ${i * slidesToScroll <= currentIndex && currentIndex < (i + 1) * slidesToScroll ? 'active' : ''}`}
              onClick={() => setCurrentIndex(i * slidesToScroll)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}