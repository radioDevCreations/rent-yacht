import { SystemBoolean } from '@/utilities/System';
import './BoatifyScrollUp.scss';
import React, { useState, useEffect } from 'react';
import { MdKeyboardArrowUp } from 'react-icons/md';

const BoatifyScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(SystemBoolean.True);
      } else {
        setIsVisible(SystemBoolean.False);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="boatify-scroll-up">
          <MdKeyboardArrowUp />
        </button>
      )}
    </>
  );
};

export default BoatifyScrollUp;
