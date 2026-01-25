'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Card {
  id: number;
  name: string;
  image: string;
  message: string;
  twitter?: string;
}

const cards: Card[] = [
  {
    id: 1,
    name: 'Tim Beiko',
    image: 'https://pbs.twimg.com/profile_images/1082093593840349184/P2B7Qiyn_400x400.jpg',
    message: 'Wanted to share I think @EthCatHerders are awesome: they help make ACD and other things accessible to more folks with transcripts, blog posts, and video series.',
    twitter: 'https://twitter.com/TimBeiko',
  },
  {
    id: 2,
    name: 'Udi Wertheimer',
    image: '/assets/profiles/udi.png',
    message: 'You guys are doing a great job with the Ethereum Cat Herders so keep doing it. It\'s really cool.',
    twitter: 'https://twitter.com/udiWertheimer',
  },
  {
    id: 3,
    name: 'Auryn Macmillan',
    image: '/assets/profiles/auryn.png',
    message: 'clrfunds - "Really appreciate all of your effort to wrangle the community."',
    twitter: 'https://twitter.com/auryn_macmillan',
  },
  {
    id: 4,
    name: 'Scott Moore',
    image: '/assets/profiles/scott.png',
    message: 'Gitcoin - "Very glad you\'re all still out doing this!"',
    twitter: 'https://twitter.com/notscottmoore',
  },
  {
    id: 5,
    name: 'Griff Green',
    image: '/assets/profiles/griff.png',
    message: 'Givethio - "Love you Cat Herders! MEEEEOOW"',
    twitter: 'https://twitter.com/thegrifft',
  },
  {
    id: 6,
    name: 'Sam Richard',
    image: '/assets/profiles/sam.png',
    message: 'ethereum.org - "Keep up the great work!"',
    twitter: 'https://twitter.com/samonchain',
  },
];

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(cards.length); // Start at duplicated cards
  const [isHovered, setIsHovered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate cards for infinite loop: [last cards] + [all cards] + [first cards]
  const duplicatedCards = [...cards, ...cards, ...cards];
  const totalCards = cards.length;
  const totalDuplicatedCards = duplicatedCards.length;
  const cardsPerView = isLargeScreen ? 2 : 1;

  // Check screen size after mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      // If we've reached the end of duplicated cards, jump to the start of the middle set
      if (next >= totalCards * 2) {
        // Instantly jump to start without transition
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalCards);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 0);
        return next;
      }
      return next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev - 1;
      // If we've gone before the start of duplicated cards, jump to the end of the middle set
      if (next < totalCards) {
        // Instantly jump to end without transition
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(totalCards * 2 - 1);
          setTimeout(() => setIsTransitioning(true), 50);
        }, 0);
        return next;
      }
      return next;
    });
  };

  // Auto-slide functionality
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 1;
          // If we've reached the end of duplicated cards, jump to the start of the middle set
          if (next >= totalCards * 2) {
            // Instantly jump to start without transition
            setTimeout(() => {
              setIsTransitioning(false);
              setCurrentIndex(totalCards);
              setTimeout(() => setIsTransitioning(true), 50);
            }, 0);
            return next;
          }
          return next;
        });
      }, 3000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, cardsPerView, totalCards]);

  const goToSlide = (index: number) => {
    // Map dot index to the middle set of duplicated cards
    setCurrentIndex(totalCards + index);
  };

  // Calculate dots - one dot per card since we move one at a time
  const totalDots = totalCards;
  
  // Get the actual card index for dots (0 to totalCards-1)
  const actualIndex = currentIndex >= totalCards && currentIndex < totalCards * 2 
    ? currentIndex - totalCards 
    : currentIndex % totalCards;

  // Don't render slider content until mounted to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="card-slider-wrapper">
        <div className="card-slider-container">
          <div className="card-slider-header">
            <h2 className="card-slider-title">What People Say</h2>
            <div className="card-slider-controls">
              <button
                className="card-slider-nav-btn"
                aria-label="Previous card"
                disabled
              >
                <ChevronLeft className="card-slider-nav-icon" />
              </button>
              <button
                className="card-slider-nav-btn"
                aria-label="Next card"
                disabled
              >
                <ChevronRight className="card-slider-nav-icon" />
              </button>
            </div>
          </div>
          <div className="card-slider-track-container">
            <div 
              className="card-slider-track" 
              style={{ 
                width: `${totalCards * 3 * 100}%`,
                transform: `translateX(-${totalCards * (100 / (totalCards * 3))}%)`
              }}
            >
              {[...cards, ...cards, ...cards].map((card, index) => (
                <div
                  key={`${card.id}-${index}`}
                  className="card-slider-item"
                  style={{ width: `${100 / (totalCards * 3)}%`, flexShrink: 0 }}
                >
                  <div className="card-slider-card">
                    <div className="card-slider-image-wrapper">
                      <img 
                        src={card.image} 
                        alt={card.name}
                        className="card-slider-image"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/cat_head.png';
                        }}
                      />
                    </div>
                    <div className="card-slider-content">
                      {card.twitter ? (
                        <a 
                          href={card.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="card-slider-name-link"
                        >
                          <h3 className="card-slider-name">{card.name}</h3>
                        </a>
                      ) : (
                        <h3 className="card-slider-name">{card.name}</h3>
                      )}
                      <p className="card-slider-message">{card.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card-slider-dots">
            {Array.from({ length: totalCards }).map((_, index) => (
              <button
                key={index}
                className="card-slider-dot"
                aria-label={`Go to slide ${index + 1}`}
                disabled
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-slider-wrapper">
      <div className="card-slider-container">
        {/* Header with Title and Arrows */}
        <div className="card-slider-header">
          <h2 className="card-slider-title">What People Say</h2>
          <div className="card-slider-controls">
            <button
              onClick={prevSlide}
              className="card-slider-nav-btn"
              aria-label="Previous card"
            >
              <ChevronLeft className="card-slider-nav-icon" />
            </button>
            <button
              onClick={nextSlide}
              className="card-slider-nav-btn"
              aria-label="Next card"
            >
              <ChevronRight className="card-slider-nav-icon" />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          className="card-slider-track-container"
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
        >
          <div
            className="card-slider-track"
            style={{
              transform: `translateX(-${currentIndex * (100 / totalDuplicatedCards)}%)`,
              transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
              width: isLargeScreen ? `${(totalDuplicatedCards / cardsPerView) * 100}%` : `${totalDuplicatedCards * 100}%`,
            }}
          >
            {duplicatedCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="card-slider-item"
                style={{
                  flexShrink: 0,
                  width: `${100 / totalDuplicatedCards}%`,
                }}
              >
                <div className="card-slider-card">
                  <div className="card-slider-image-wrapper">
                    <img 
                      src={card.image} 
                      alt={card.name}
                      className="card-slider-image"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/cat_head.png';
                      }}
                    />
                  </div>
                  <div className="card-slider-content">
                    {card.twitter ? (
                      <a 
                        href={card.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="card-slider-name-link"
                      >
                        <h3 className="card-slider-name">{card.name}</h3>
                      </a>
                    ) : (
                      <h3 className="card-slider-name">{card.name}</h3>
                    )}
                    <p className="card-slider-message">{card.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="card-slider-dots">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`card-slider-dot ${index === actualIndex ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
