import FootballIcon from "../assets/football.png";
import BasketballIcon from "../assets/basketball.png";

// eslint-disable-next-line react/prop-types
const MainBtn = ({ isActive, onClick, labelItem }) => {
  const getSportsIcon = () => {
    switch (labelItem) {
      case "football":
        return <img src={FootballIcon} alt="Football Icon" />;
      case "basketball":
        return <img src={BasketballIcon} alt="Basketball Icon" />;
      default:
    }
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center p-2 w-12 h-12 rounded-full transition 
      shadow-md hover:shadow-lg dark:shadow-sm dark:hover:shadow-md dark:shadow-gray-900
      ${
        isActive
          ? "bg-blue-500 text-white dark:bg-blue-600 dark:text-white"
          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      {getSportsIcon()}
    </button>
  );
};

export default MainBtn;
