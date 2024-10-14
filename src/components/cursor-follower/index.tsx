import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import style from './styles.module.css'

const CursorFollower: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursorFollower = cursorRef.current;
    if (!cursorFollower) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.13;
    const fpms = 60 / 1000;

    const xSet = gsap.quickSetter(cursorFollower, 'x', 'px');
    const ySet = gsap.quickSetter(cursorFollower, 'y', 'px');

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(cursorFollower, {
        opacity: 1,
        duration: 2,
        ease: 'expo.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    gsap.ticker.add(( deltaTime) => {
      const delta = deltaTime * fpms;
      const dt = 1.0 - Math.pow(1.0 - speed, delta);

      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;

      xSet(pos.x);
      ySet(pos.y);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={style.cursor_follower}
    ></div>
  );
};

export default CursorFollower;
