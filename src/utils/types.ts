export type Commit = {
  commit: {
    author: {
      date: string;
    };
    message: string;
  };
};

export type getContentByPageType = {
  [key: string]: JSX.Element; // Signature d'indexation
  "": JSX.Element;
  Experience: JSX.Element;
  "About me": JSX.Element;
  "Current projects": JSX.Element;
};