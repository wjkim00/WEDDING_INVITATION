// ReadyPage.js
import React, { useEffect, useRef } from 'react';
import '../styles/ready.css';

const ReadyPage = ({ onFinish }) => {
  const text1 = '원진 ♥ 연진 결혼합니다.';
  const text2 = '2025.09.07.';
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const el1 = text1Ref.current;
    const el2 = text2Ref.current;

    // Calculate widths and set CSS variable
    const w1 = el1.scrollWidth ;
    const w2 = el2.scrollWidth ;
    el1.style.setProperty('--target-width', `${w1}px`);
    el2.style.setProperty('--target-width', `${w2}px`);

    // Force reflow
    void el1.offsetWidth;

    // Initialize carets
    el1.style.borderRight = '.15em solid #000';
    el2.style.borderRight = 'none';

    // Start first typing
    el1.style.animation = `typing1 2s steps(${text1.length}) 0.5s forwards`;

    // Handle first end
    const handleFirstEnd = (e) => {
      if (e.animationName === 'typing1') {
        el1.style.borderRight = 'none';
        // Prepare second
        el2.style.borderRight = '.15em solid #000';
        void el2.offsetWidth;
        el2.style.animation = `typing2 1.5s steps(${text2.length}) 0s forwards`;
        el1.removeEventListener('animationend', handleFirstEnd);
      }
    };
    el1.addEventListener('animationend', handleFirstEnd);

    // Handle second end: freeze width and blink
    const handleSecondEnd = (e) => {
      if (e.animationName === 'typing2') {
        // Freeze width so text remains
        el2.style.width = `${w2}px`;
        // Start blinking caret
        el2.style.animation = `blink-caret 0.75s step-end infinite 0s`;
        el2.removeEventListener('animationend', handleSecondEnd);
      }
    };
    el2.addEventListener('animationend', handleSecondEnd);

    // Fade out after delay
    const timeout = setTimeout(() => {
      document.querySelector('.ready-screen').classList.add('fade-up');
      setTimeout(onFinish, 1000);
    }, 5000);

    return () => {
      clearTimeout(timeout);
      el1.removeEventListener('animationend', handleFirstEnd);
      el2.removeEventListener('animationend', handleSecondEnd);
    };
  }, [onFinish]);

  return (
    <div className="ready-screen">
      <h1 ref={text1Ref} className="handwriting">{text1}</h1>
      <h2 ref={text2Ref} className="handwriting">{text2}</h2>
    </div>
  );
};

export default ReadyPage;