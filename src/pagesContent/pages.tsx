import { getContentByPageType } from "../utils/types";
import { AboutMe } from "./AboutMe";
import { CurrentWork } from "./CurrentWork";
import { Experience } from "./Experiences";
import { ToDos } from "./Todos";
import { Welcome } from "./Welcome";

export const getContentByPage: getContentByPageType = {
  "": <Welcome />,
  Experience: <Experience />,
  "About me": <AboutMe />,
  "Current projects": <CurrentWork />,
  "What's left to do on the website?": <ToDos />,
};
