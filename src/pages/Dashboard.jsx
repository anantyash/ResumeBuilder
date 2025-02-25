import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}

      {/* Main Content Section */}
      <main className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Resume Card */}
          <Link to="/create-resume">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-3">Create Resume</h2>
              <p>Start building your resume from scratch or use a template.</p>
            </div>
          </Link>

          {/* ATS Score Card */}
          <Link to="/ats-score">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-3">ATS Score</h2>
              <p>Check your resume's compatibility with job descriptions.</p>
            </div>
          </Link>

          {/* Enhance Resume with AI Card */}
          <Link to="/enhance-resume">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-3">Enhance Resume with AI</h2>
              <p>Let AI optimize your resume based on your job description.</p>
            </div>
          </Link>

          {/* My Projects Card */}
          <Link to="/my-projects">
            <div className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-bold mb-3">My Projects</h2>
              <p>View and manage all your previously created resumes.</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
