import { useEffect, useState } from "react";
import "./App.css";
import ParticleCanvas from "./components/ParticleCanvas/ParticleCanvas";
import { colors } from "./utils/color";
import Card from "./components/Card/Card";

type Commit = {
  commit: {
    author: {
      date: string;
    };
    message: string;
  };
};

function App() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [githubToken, setGithubToken] = useState("");

  function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  const fetchCommits = async () => {
    try {
      let response = null;
      if (githubToken.length) {
        response = await fetch(
          "https://api.github.com/repos/Ektoplasme/Ektoplasme.github.io/commits",
          {
            headers: {
              Authorization: `token ${githubToken}`,
            },
          }
        );
      } else {
        response = await fetch(
          "https://api.github.com/repos/Ektoplasme/Ektoplasme.github.io/commits"
        );
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Commit[] = await response.json();
      setCommits(data);
    } catch (err) {
      const error = err as Error;
      console.log(error.message);
    }
  };

  useEffect(() => {
    const letters = document.querySelectorAll(".hover-title span");
    const sound = new Audio("ClickSound.mp3");

    fetchCommits();

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
    fetchCommits();
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
      <div className="app-cards-container">
        <Card
          title="Hi! 👋"
          description="I'm Joséphine Robin, fullstack (intermediate frontend and junior backend) web developer! Welcome to my website. Here you'll find everything about me, my experiences, current projects, and more!"
          subtitle="(Still under construction, you can play with the particles and the letters for now 🥲🌈)"
        />
      </div>
      <div className="github-commits-container">
        <b>Last updates</b> (so you can see i'm not lazy) :
        <div
          className="commits-list"
          style={{
            overflow: commits.length ? "scroll" : "hidden",
            display: commits.length ? "block" : "flex",
          }}
        >
          {commits.length ? (
            commits.map((commit, index) => (
              <div key={index}>
                <p>
                  <strong>
                    {new Date(commit.commit.author.date).toLocaleDateString()}:
                  </strong>{" "}
                  {commit.commit.message}
                </p>
              </div>
            ))
          ) : (
            <form onSubmit={handleTokenSubmit}>
              <p>
                Github API public rate limit exceeded, i don't use my personal
                access token here for obvious reasons! 🙇‍♀️ If you want to access
                to my latest commits you still can{" "}
                <b>
                  <a
                    target="_blank"
                    href="https://github.com/Ektoplasme/Ektoplasme.github.io/commits/main/"
                  >
                    here
                  </a>
                </b>{" "}
                <b>OR</b> you can also enter your token here{" "}
                <input
                  value={githubToken}
                  onChange={handleTokenInputChange}
                  placeholder="Your token here"
                />
                <button type="submit">authenticate</button>
              </p>
            </form>
          )}
        </div>
      </div>
      <ParticleCanvas particleNumber={250} />
      <div className="glass-effect" />
    </>
  );
}

export default App;
