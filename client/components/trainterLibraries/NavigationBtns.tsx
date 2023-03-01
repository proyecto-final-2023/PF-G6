type LibraryContainer = {
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  length: number;
};

const BtnStyles =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer";

export default function NavigationBtns(props: LibraryContainer) {
  const { currentPage, prevPage, nextPage, length } = props;

  return (
    <div className="flex justify-between items-center w-full pt-[115px] px-36">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={BtnStyles}
      >
        Previous
      </button>
      <div className="text-xl font-bold">{currentPage}</div>
      <button onClick={nextPage} disabled={length === 0} className={BtnStyles}>
        Next
      </button>
    </div>
  );
}
