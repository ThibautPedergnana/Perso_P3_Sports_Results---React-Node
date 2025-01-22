// eslint-disable-next-line react/prop-types
const MainBtn = ({ isActive, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
        isActive
          ? "bg-blue-500 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
};

export default MainBtn;
