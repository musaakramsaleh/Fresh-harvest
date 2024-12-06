const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin">
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
