"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

// Array of image sources to be used for animations
const images = ["/c1.jpg", "/c2.jpg", "/c3.jpg", "/c4.jpg", "/cs50.png"];

// Throttle function to limit the rate at which a function can fire.
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const ImageTrial: React.FC = () => {
  // Reference to the hero container div
  const heroRef = useRef<HTMLDivElement>(null);

  // useRef hooks to manage mutable values without causing re-renders
  const isEnabledRef = useRef(false);
  const countRef = useRef(0);
  const timeRef = useRef(100); // Throttle time in milliseconds

  // Function to calculate the next image index
  const calcIndex = (len: number) => {
    const newCount = (countRef.current + 1) % len;
    countRef.current = newCount;
    return newCount;
  };

  // Function to handle image animation
  const animateImages = (event: MouseEvent) => {
    const imageSize = 350; // Image size in pixels
    const countIndex = calcIndex(images.length);

    // Create a new image element
    const image = document.createElement("img");
    image.src = images[countIndex];
    image.alt = "Animated Image";
    image.style.width = `${imageSize}px`;
    image.style.height = `${imageSize}px`;
    image.style.position = "absolute";
    image.style.top = `${event.pageY - imageSize / 2}px`;
    image.style.left = `${event.pageX - imageSize / 2}px`;
    image.style.transition = "transform 0.5s ease, opacity 1.5s ease, filter 1.5s ease";
    image.style.transform = "scale(1) rotate(0deg)";
    image.style.opacity = "1";
    image.style.objectFit = "contain";
    image.style.pointerEvents = "none"; // Prevent image from blocking mouse events

    // Append the image to the hero container
    if (heroRef.current) {
      heroRef.current.appendChild(image);
    }

    // Generate a random rotation degree between -15 and 15
    const randomDeg = Math.floor(Math.random() * 30) - 15;

    // Use requestAnimationFrame to ensure the transition is applied after the element is in the DOM
    requestAnimationFrame(() => {
      image.style.transform = `scale(1) rotate(${randomDeg}deg)`;
    });

    // Start fading out and scaling down the image after 1.5 seconds
    setTimeout(() => {
      image.style.opacity = "0";
      image.style.filter = "blur(10px)";
      image.style.transform = `scale(0.25) rotate(${randomDeg}deg)`;
    }, 1500);

    // Remove the image from the DOM after 2.5 seconds
    setTimeout(() => {
      if (heroRef.current?.contains(image)) {
        heroRef.current.removeChild(image);
      }
    }, 2500);
  };

  useEffect(() => {
    // Throttled mousemove handler
    const throttledMouseMove = throttle((event: MouseEvent) => {
        console.log(event)
      if (!isEnabledRef.current) {
        isEnabledRef.current = true;
        animateImages(event);
        setTimeout(() => {
          isEnabledRef.current = false;
        }, timeRef.current);
      }
    }, timeRef.current);

    // Add the throttled mousemove event listener
    window.addEventListener("mousemove", throttledMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", throttledMouseMove);
    };
  }, []);

  return (
    <div ref={heroRef} className="hero relative w-full h-full  h-screen" style={{ position: "relative" }}>
      {/* Optional: You can add static content here if needed */}
    </div>
  );
};

export default ImageTrial;
