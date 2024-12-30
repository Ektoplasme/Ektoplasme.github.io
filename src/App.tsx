import { useEffect, useState } from "react";
import "./App.css";
import ParticleCanvas from "./components/ParticleCanvas/ParticleCanvas";
import { colors } from "./utils/color";
import Card from "./components/Card/Card";
import { fetchCommits } from "./utils/api";
import { getContentByPage } from "./pagesContent/pages";
import { Commit } from "./utils/types";
import { CommitsViewer } from "./components/CommitsViewer/CommitsViewer";
import { BottomMenu } from "./pagesContent/BottomMenu";

function App() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [githubToken, setGithubToken] = useState("");
  const [currentPage, setCurrentPage] = useState<string>("");

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  async function getCommits() {
    const data = await fetchCommits(githubToken);
    setCommits(data);
  }
  useEffect(() => {
    const letters = document.querySelectorAll(".hover-title span");
    const sound = new Audio("ClickSound.mp3");

    getCommits();

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

  const handleTokenInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubToken(e.target.value);
  };

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getCommits();
  };

  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = e.currentTarget.name;
    setCurrentPage(buttonName);
  };

  return (
    <>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/jos%C3%A9phine-robin-2359b3155/"
      >
        <img className="linkedin-logo" src="Linkedin.svg" />
      </a>
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
      <Card
        title={currentPage === "" ? "Hi! 👋" : currentPage}
        content={getContentByPage[currentPage]}
        expanded={!!currentPage}
        bottom={
          <BottomMenu currentPage={currentPage} onButtonClick={onButtonClick} />
        }
      />
      <CommitsViewer
        commits={commits}
        handleTokenSubmit={handleTokenSubmit}
        githubToken={githubToken}
        handleTokenInputChange={handleTokenInputChange}
      />
      <ParticleCanvas particleNumber={250} />
      <div className="glass-effect" />
    </>
  );
}

export default App;
