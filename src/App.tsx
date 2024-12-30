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
  const [currentPage, setCurrentPage] = useState("");

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

  const onButtonClick = (e) => {
    setCurrentPage(e.target.name);
  };

  const getContentByPage = {
    "": (
      <>
        <h3>
          I'm Joséphine Robin, fullstack (intermediate frontend and junior
          backend) web developer! Welcome to my website. Here you'll find
          everything about me, my experiences, current projects, and more!
        </h3>
        <h4>(Website still under construction 🥲🌈)</h4>
      </>
    ),
    Experience: (
      <>
        <h3>September 2024 - end January 2025 (4months):</h3>
        <h4>
          Fullstack training to validate french title "Concepteur Développeur
          d'Application"
        </h4>
        <h3>July 2020 - December 2023 (3 years):</h3>
        <h4>React frontend engineer at Sketchfab/Fab @Epic Games</h4>
        <h3>2020 for 6 months:</h3>
        <h4>React frontend engineer internship at Sketchfab</h4>
        <h3>2019 for 6 months:</h3>
        <h4>
          React frontend engineer internship at OuiSpoon (now FasterClass)
        </h4>

        <h3>2016 - 2020:</h3>
        <h4>
          Student at 42 school - Paris: Projects in C, algorithms, raytracer,
          raycaster, intro to web development, hackathons
        </h4>
        <h3>2015 - 2016:</h3>
        <h4>
          Preparatory classes in Design and fine arts (MANAA) at École de Condé
        </h4>
      </>
    ),
    "About me": (
      <>
        <h3>Facts about me:</h3>
        <h4>
          - I got my first personal computer at the age of 13. Before that, I
          used the family computer to experiment with all sorts of things
          —probably filling it with viruses in the process... Sorry, Mum! 👩🏻‍💻🐛
        </h4>
        <h4>
          - II enjoy spending time alone, whether it's walking, biking, or
          relaxing in coffee shops and restaurants. I believe it's important to
          value our own company. Don’t worry, I do see people too! 👻
        </h4>
        <h4>
          - My cat's name is Bandicoot, inspired by the video game series I've
          always loved (my favorite is Twinsanity, even if it's a bit
          underrated).
        </h4>
        <h4>
          - I’m a fan of retro gaming and indie video games. I don’t have as
          much time to play these days, but when I find a game I love, I can
          immerse myself in it for days!
        </h4>
        <h4>
          - I'm a recovering social media addict. After researching their
          downsides, I switched to a minimalist, Blackberry-style smartphone
          with no social media apps (except WhatsApp for family). I still access
          social media through my laptop when needed. Fun fact: my phone has GBA
          and NDS emulators! 💁‍♀️
        </h4>
        <h4>
          - I come from a big family —I have seven sisters, and I’m the fourth.
          We’re a close-knit bunch, and two of them are also into coding!
        </h4>
        <h4>
          - I care about my health and well-being. I’ve learned to eat well, and
          I try to stay active by biking, walking, running, or hitting the gym,
          also i’ve been journaling since I was a child. 📖
        </h4>
        <h4>
          - I read a lot, but i often forget what i've read. I'm starting a
          journal to summerize the books i've read so i don't forget anymore 👵🏻
        </h4>
      </>
    ),
    "Current projects": (
      <>
        <h3>I'm currently working on:</h3>
        <h4>
          - Finishing my training to become a fullstack engineer, ends at the
          end of January. I have to review all the concepts we saw, especially
          the new ones for me (Data modeling, Continuous Integration/ Delivery,
          hosting, accessibility.. and much more, very intense!)
        </h4>
        <h4>
          - This website 🌈 I plan to add personal projects with vanilla
          Javascript, React, Vue and maybe angular so i can compare everything.
          I'm experimenting with canva also, as you can see with the particles
        </h4>
        <h4>
          - A secret personal project.. Which soon (i hope) won't be secret
          anymore 👩🏻‍💻
        </h4>
        <h3>Other than dev:</h3>
        <h4>- Learning Chinese 🇨🇳 and Spanish 🇪🇸</h4>
        <h4>
          - Learning piano and guitar (and to sing but it's not working for now
          😆)
        </h4>
        <h3>Planning to:</h3>
        <h4>
          - Learn Backend engineering in Python (for now i used Javascript with
          Node)
        </h4>
        <h4>- Experiment with an arduino !</h4>
      </>
    ),
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
          <>
            <button name="Experience" onClick={onButtonClick}>
              Experience
            </button>
            <button name="Current projects" onClick={onButtonClick}>
              Current projects
            </button>
            <button name="About me" onClick={onButtonClick}>
              About me
            </button>
            {!!currentPage && (
              <button name="" onClick={onButtonClick}>
                Return
              </button>
            )}
          </>
        }
      />
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
