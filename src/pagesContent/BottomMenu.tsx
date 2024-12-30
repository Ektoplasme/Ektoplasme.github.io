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
  );
};
