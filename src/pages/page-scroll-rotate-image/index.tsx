import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { motion, useAnimation } from 'framer-motion';
import StarPng from './images/star.png';

import InfiniteScrollDesktop from '../../components/cards-Infinite-scroll-desctop';
import InfiniteScrollMobile from '../../components/cards-Infinite-scroll-mobile';



const RotatingImage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  //@ts-ignore
  const [scrollY, setScrollY] = useState<number>(0);
  const controls = useAnimation();
  const scrollThreshold = 300;
  const scrollHeight = 2000;
  const baseRotationSpeed = 0.2;

  const scrollStep = 3;
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrollY(scrollTop);

      const homeHeight = (document.querySelector('#homeMain')?.clientHeight || 0) + 120;
      const shouldShowCards = scrollTop > homeHeight;
      setIsVisible(shouldShowCards);

     
     

          const rotationPerScroll = (360 / scrollHeight) * baseRotationSpeed;
          const newRotation = scrollTop * rotationPerScroll;
          controls.start({ rotate: newRotation });
   
      

      const endOfHomeIndicator = document.getElementById('end-of-home-indicator');
      if (endOfHomeIndicator) {
        endOfHomeIndicator.style.opacity = scrollTop > homeHeight ? '0.3' : '1';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls,  scrollStep, scrollThreshold, scrollHeight, baseRotationSpeed]);

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  return (
    <div id="rotating-image-container " 
    >
    
    
    {isMobile ? <InfiniteScrollMobile /> : <InfiniteScrollDesktop />}
   
    
      {isVisible && (
        <div className="z-0 fixed   items-center justify-between p-4">
     
     
          {/* Rotating image */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut', delay: isVisible ? 0.2 : 0 }}
          >
            <motion.img
              src={StarPng}
              alt="Rotating"
              animate={controls}
              transition={{ duration: 0.0, ease: 'easeInOut' }}
              className="w-60 h-60"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RotatingImage;
