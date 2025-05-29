import React from 'react';

const CreditsSection = () => {
  return (
    <div className="bg-[#12161C] text-white min-h-screen py-32">
      <div className="container mx-auto text-center">
        <h2 className="text-6xl font-bold mb-4">Meet the Team</h2>
        <p className="text-lg mb-12 text-gray-400">The minds who designed, built, and brought this project to life.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {/* Team Member Cards */}
          <div className="rounded-lg shadow-md p-12 bg-[#161B22]">
            <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-user text-4xl text-white"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ahmed Qudsi Ghouse Ali Khan</h3>
            <p className="text-blue-400 mb-2">Full-Stack Dev. & Project Visionary</p>
            <div className="flex justify-center mt-2">
              {/* Social Icons */}
              <a href="#" className="text-gray-400 hover:text-white mr-4"><i className="fab fa-github"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          <div className="rounded-lg shadow-md p-12 bg-[#161B22]">
            <div className="w-32 h-32 rounded-full bg-gray-700 mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-user text-4xl text-white"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Omar Syed Kaiser</h3>
            <p className="text-blue-400 mb-2">UI/UX Designer & Project Backbone</p>
            <div className="flex justify-center mt-2">
              {/* Social Icons */}
              <a href="#" className="text-gray-400 hover:text-white mr-4"><i className="fab fa-github"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditsSection;
