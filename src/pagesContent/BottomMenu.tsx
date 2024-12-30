type BottomMenuType = {
  currentPage: string;
  onButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BottomMenu = ({ currentPage, onButtonClick }: BottomMenuType) => {
  return (
    <>
      <button name="Experience" onClick={onButtonClick}>
        Experience
      </button>
      <button name="Current projects" onClick={onButtonClick}>
        Projects
      </button>
      <button name="About me" onClick={onButtonClick}>
        About me
      </button>
      <button name="What's left to do on the website?" onClick={onButtonClick}>
        To do
      </button>
      {!!currentPage && (
        <button name="" onClick={onButtonClick}>
          Return
        </button>
      )}
    </>
  );
};
