
import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  duration: number;
  delay: number;
  left: number;
  horizontalMovement: number;
  color: string;
}

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const blueShades = [
    'rgba(0, 188, 212, 0.3)', // cyan
    'rgba(30, 144, 255, 0.25)', // dodger blue
    'rgba(65, 105, 225, 0.2)', // royal blue
    'rgba(0, 191, 255, 0.3)', // deep sky blue
    'rgba(135, 206, 250, 0.25)', // light sky blue
    'rgba(0, 206, 209, 0.3)', // dark turquoise
  ];

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 20; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 40 + 15, // 15-55px
          duration: Math.random() * 12 + 10, // 10-22s
          delay: Math.random() * 8, // 0-8s delay
          left: Math.random() * 100, // 0-100% from left
          horizontalMovement: Math.random() * 60 - 30, // -30px to +30px horizontal drift
          color: blueShades[Math.floor(Math.random() * blueShades.length)],
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full animate-bubble-float opacity-70"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            background: `radial-gradient(circle at 30% 30%, ${bubble.color.replace('0.3', '0.5')}, ${bubble.color})`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: `0 0 ${bubble.size * 0.5}px ${bubble.color}, inset 0 0 ${bubble.size * 0.3}px rgba(255, 255, 255, 0.3)`,
            transform: `translateX(${bubble.horizontalMovement}px)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
