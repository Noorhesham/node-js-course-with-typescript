import React from "react";
import "../water.scss";
const Button = ({ text, onClick, className }: { text: string; onClick: () => void; className: string }) => {
  return (
    <button onClick={onClick} className={`${className} box`}>
      <span>{text}</span>
      <i></i>
    </button>
  );
};

export default Button;
