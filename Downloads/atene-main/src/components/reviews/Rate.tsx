"use client";
import { useState } from "react";
//STYLES
const containerStyle = { display: "flex", alignItems: "center", gap: "16px" };
const StarStyle = { display: "flex" };

export default function Starrating({
  MaxRating = 10,
  color = "#fcc419",
  size = 24,
  className = "",
  messages = [],
  defaultRating = 0,
  OnSetRating,
  change = true,
}: {
  MaxRating?: number;
  color?: string;
  size?: number;
  className?: string;
  messages?: any;
  defaultRating?: number;
  OnSetRating?: any;
  change?: boolean;
}) {
  console.log(defaultRating);
  const [rating, setrating] = useState(defaultRating);
  const [temprating, settemp] = useState(0);
  const textStyle = {
    lineHeight: "0",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };
  function handleRating(rating: number) {
    setrating(rating);
    OnSetRating(rating);
  }
  return (
    <div style={containerStyle} className={className}>
      <div className=" my-2 p-1" style={StarStyle}>
        {Array.from({ length: MaxRating }, (_, i) =>
          change ? (
            <Star
              key={i}
              color={color}
              size={size}
              rating={rating}
              empty={temprating ? temprating < i + 1 : rating < i + 1}
              onRate={() => handleRating(i + 1)}
              onHoverIn={() => settemp(i + 1)}
              onHoverOut={() => settemp(0)}
            />
          ) : (
            <Star
              key={rating + i}
              color={color}
              size={size}
              rating={rating}
              empty={temprating ? temprating < i + 1 : rating < i + 1}
            />
          )
        )}
      </div>
      <p style={textStyle}>
        {messages.length === MaxRating
          ? messages[temprating ? temprating - 1 : rating - 1]
          : temprating || rating || ""}
      </p>
    </div>
  );
}

function Star({
  onRate,
  empty,
  onHoverIn,
  onHoverOut,
  color,
  size,
}: {
  onRate: any;
  empty: boolean;
  onHoverIn: any;
  onHoverOut: any;
  color: string;
  size: number;
}) {
  const star = {
    width: `${size}px`,
    height: `${size}px`,
    display: "black",
    cursor: "pointer",
  };
  return (
    <span role="button" onClick={onRate} style={star} onMouseEnter={onHoverIn} onMouseLeave={onHoverOut}>
      {empty ? (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} stroke={color}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}
