import FootballIcon from "../assets/football.png";
import BasketballIcon from "../assets/basketball.png";

// eslint-disable-next-line react/prop-types
function HomeCard({ isActive, onClick, labelItem }) {
  const getSportsIcon = () => {
    switch (labelItem) {
      case "football":
        return <img src={FootballIcon} alt="Football Icon" />;
      case "basketball":
        return <img src={BasketballIcon} alt="Basketball Icon" />;
      default:
    }
  };

  const getSportLabel = () => {
    switch (labelItem) {
      case "football":
        return (
          <p className="text-xl font-bold">
            Interested in the best leagues in Europe?
          </p>
        );
      case "basketball":
        return (
          <p className="text-xl font-bold">
            Interested in the best league in the world?
          </p>
        );
      default:
    }
  };

  return (
    <div
      className="w-60 h-80 bg-gray-50 dark:bg-gray-800 p-3 flex flex-col gap-1 
        rounded-2xl justify-evenly items-center shadow-lg dark:shadow-lg dark:shadow-gray-950"
    >
      <span className="p-3 w-28 h-28">{getSportsIcon()}</span>
      <div className="flex flex-col gap-4 text-center">
        {getSportLabel()}
        <button
          onClick={onClick}
          className={`hover:bg-sky-700 text-gray-50 bg-sky-800 py-2 rounded-md
          ${
            isActive
              ? "bg-blue-500 text-white dark:bg-blue-500"
              : "dark:bg-blue-500 hover:bg-gray-200 dark:hover:bg-blue-400"
          }`}
        >
          View Leagues
        </button>
      </div>
    </div>
  );
}

export default HomeCard;
