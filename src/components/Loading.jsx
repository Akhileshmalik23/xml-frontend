import React from "react";

function Loading({loading}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="loader border-t-4 border-b-4 border-blue-500 h-12 w-12 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loading;
