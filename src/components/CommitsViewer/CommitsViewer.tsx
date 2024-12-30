import { Commit } from "../../utils/types";
type CommitsViewerType = {
  commits: Commit[];
  handleTokenSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  githubToken: string;
  handleTokenInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CommitsViewer = ({
  commits,
  handleTokenSubmit,
  githubToken,
  handleTokenInputChange,
}: CommitsViewerType) => {
  return (
    <div className="github-commits-container">
      <b>Latest commits</b> (on the website) :
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
              access token here for obvious reasons! 🙇‍♀️ If you want to access to
              my latest commits you still can{" "}
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
  );
};
