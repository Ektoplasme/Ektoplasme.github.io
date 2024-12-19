import { useEffect } from "react";
import "./App.css";
import ParticleCanvas from "./ParticleCanvas";
import { colors } from "./color";
import React from "react";

function App() {
  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  useEffect(() => {
    const letters = document.querySelectorAll(".hover-title span");
    const sound = new Audio("ClickSound.mp3");

    letters.forEach((letter) => {
      const span = letter as HTMLSpanElement;
      const initialColor = getRandomColor();
      span.style.color = initialColor;
      span.style.textShadow = `2px 2px 5px ${initialColor}`;
    });

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLSpanElement;
      const color = getRandomColor();
      target.style.color = color;
      target.style.textShadow = `2px 2px 5px ${color}`;
    };

    const handleMouseClick = () => {
      sound.currentTime = 0.21;
      sound.play();
    };

    letters.forEach((letter) => {
      const span = letter as HTMLSpanElement;
      span.addEventListener("mouseenter", handleMouseEnter);
      span.addEventListener("click", handleMouseClick);
    });

    return () => {
      letters.forEach((letter) => {
        const span = letter as HTMLSpanElement;
        span.removeEventListener("mouseenter", handleMouseEnter);
        span.removeEventListener("click", handleMouseClick);
      });
    };
  }, []);

  return (
    <>
      <h1 className="hover-title">
        <span>J</span>
        <span>O</span>
        <span>S</span>
        <span>É</span>
        <span>P</span>
        <span>H</span>
        <span>I</span>
        <span>N</span>
        <span>E</span>
      </h1>
      <ParticleCanvas />
      <div className="glass-effect" />
    </>
  );
}

export default App;
