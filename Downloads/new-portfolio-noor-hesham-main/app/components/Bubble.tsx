"use client";
import React, { useEffect, useState } from "react";
import "../bubble.scss";
import gsap from "gsap";

const popSound = "/Pop Bubble Sound Effect 2022 (1).mp3";
const bgSound = "/Bubble Sound Effect.mp3";

interface BubbleType {
  id: number;
  style: React.CSSProperties;
}

const Bubble = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [isStart, setStart] = useState<boolean>(false);

  const getRandomStyle = (): React.CSSProperties => {
    const randomSize = Math.random() * 50 + 25;
    const randomDuration = Math.random() * 5 + 5;
    const randomDelay = Math.random() * 5;
    const randomPositionX = Math.random() * 100;
    const randomPositionY = Math.random() * 50; // Random Y position for initial placement

    return {
      width: `${randomSize}px`,
      height: `${randomSize}px`,
      left: `${randomPositionX}vw`,
      bottom: `${randomPositionY}px`, // Start at a random height
      opacity: 0, // Start with opacity 0
      animationDuration: `${randomDuration}s`,
      animationDelay: `${randomDelay}s`,
    };
  };

  useEffect(() => {
    const initialBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      style: getRandomStyle(),
    }));
    setBubbles(initialBubbles);
    setStart(true);
  }, []);

  useEffect(() => {
    if (isStart) {
      // Animate the opacity from 0 to 1
      bubbles.forEach((bubble) => {
        const bubbleElement = document.querySelector(`#bubble[data-key='${bubble.id}']`) as HTMLElement;
        if (bubbleElement) {
          gsap.to(bubbleElement, {
            opacity: 1,
            duration: 1, // Animation duration to fade in
            delay: parseFloat(bubble.style.animationDelay),
          });
        }
      });
    }
  }, [isStart, bubbles]);

  const explodeBubble = (id: number) => {
    const bubbleElement = document.querySelector(`#bubble[data-key='${id}']`) as HTMLElement;
    if (bubbleElement) {
      const audio = new Audio(popSound);
      audio.play();

      gsap.fromTo(
        bubbleElement,
        { scale: 1 },
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "back.in(1.7)",
          onComplete: () => {
            handleBubbleRemoval(id);
          },
        }
      );
    }
  };

  const handleBubbleRemoval = (id: number) => {
    setBubbles((prevBubbles) => {
      const updatedBubbles = prevBubbles.filter((bubble) => bubble.id !== id);
      if (updatedBubbles.length <= 14) {
        const newBubbles = Array.from({ length: 2 }, (_, i) => ({
          id: prevBubbles.length + i + 1,
          style: getRandomStyle(),
        }));
        return [...updatedBubbles, ...newBubbles];
      }
      return updatedBubbles;
    });
  };

  return (
    <div className="bubble-container duration-150 w-full" style={{ position: "relative", height: "100vh" }}>
      {bubbles.map((bubble) => (
        <span
          onClick={() => explodeBubble(bubble.id)}
          data-key={bubble.id}
          key={bubble.id}
          id="bubble"
          style={bubble.style}
        ></span>
      ))}
    </div>
  );
};

export default Bubble;
