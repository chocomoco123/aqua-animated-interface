
import React, { useEffect, useState } from 'react';

interface Bubble {
  id: number;
  size: number;
  duration: number;
  delay: number;
  left: number;
}

const FloatingBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = [];
      for (let i = 0; i < 15; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 30 + 10, // 10-40px
          duration: Math.random() * 10 + 8, // 8-18s
          delay: Math.random() * 5, // 0-5s delay
          left: Math.random() * 100, // 0-100% from left
        });
      }
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-t from-aquarium-cyan/20 to-aquarium-cyan/40 animate-bubble-float"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
            boxShadow: '0 0 10px rgba(0, 188, 212, 0.3)',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;
