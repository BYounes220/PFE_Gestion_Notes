import "../../styles/auth/LoadingIndicator.css";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center p-2">
      <div className="animate-spin rounded-full h-3 w-3 border-t-2 border-b-2 border-gradient-to-r from-blue-600 via-indigo-500 to-purple-500"></div>
    </div>
  );
};

export default LoadingIndicator;