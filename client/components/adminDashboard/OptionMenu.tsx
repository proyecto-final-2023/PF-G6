// * aaaa

const buttonsMapping = [
  {
    text: "Users",
    compareText: "user"
  },
  {
    text: "Trainers",
    compareText: "trainers"
  },
  {
    text: "Trainees",
    compareText: "trainees"
  },
  {
    text: "Planes Trainer",
    compareText: "planestrainer"
  },
  {
    text: "Comments",
    compareText: "comments"
  }
];

export default function OptionMenu(props: {
  currSelection: string;
  optionChanger: (option: string) => void;
}) {
  const { currSelection, optionChanger } = props;

  return (
    <div className="flex flex-col bg-gray-500 text-white h-screen w-52">
      {buttonsMapping.map((button) => (
        <button
          key={button.compareText}
          className={`w-full hover:bg-gray-700 p-4 border-solid border-2 ${
            currSelection === button.compareText && "bg-gray-300 text-black"
          }`}
          onClick={() => optionChanger(button.compareText)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}
