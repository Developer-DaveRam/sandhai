// import React from "react";
// import { Link } from "react-router-dom";

// const PageNotFound = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6">
//       {/* 404 Illustration or Icon */}
//       <div className="text-9xl font-bold text-gray-800 mb-4 animate-bounce">
//         404
//       </div>

//       {/* Title */}
//       <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
//         Oops! Page Not Found
//       </h1>

//       {/* Description */}
//       <p className="text-lg sm:text-xl text-gray-600 mb-8 text-center max-w-2xl">
//         The page you're looking for doesn't exist or has been moved. Let's get you back on track!
//       </p>

//       {/* Back to Home Button */}    
//       <Link
//         to="/homePage"
//         className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
//       >
//         Go Back Home
//       </Link>

//       {/* Optional: Fun Illustration */}
//       <div className="mt-12">
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/755/755014.png" // Replace with your own illustration or use an icon
//           alt="404 Illustration"
//           className="w-48 h-48 sm:w-64 sm:h-64 opacity-75"
//         />
//       </div>
//     </div>
//   );
// };

// export default PageNotFound;




import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-6xl font-bold text-green-600 overflow-hidden">404</h1>
      <p className="text-xl text-gray-700 mt-2">Oops! The page you're looking for doesn't exist.</p>
      <Link 
        to="/homePage" 
        className="mt-5 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
