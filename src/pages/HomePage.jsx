import React from "react";
import { Link } from "react-router-dom";
import ResumeIMG from "../assets/images/ResumeIMG.png";

function HomePage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex justify-around items-center p-10 bg-gray-100">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold mb-4">
            Craft the Perfect Resume with Ease – Tailored for Your Career Goals!
          </h1>
          <p className="text-lg mb-6">
            Create, Upgrade, and Enhance Your Resume with AI-Powered Tools.
          </p>
          <div className="flex space-x-4">
            <Link to="/register">
              <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
                Get Started
              </button>
            </Link>
            <Link to="/templates">
              <button className="bg-transparent border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white">
                Explore Templates
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[20%]">
          <img src={ResumeIMG} alt="Resume Builder" className="rounded-lg" />
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full p-10 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose ResumeBuilder?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-3">Create Resume</h3>
            <p>
              Build your resume from scratch or use our professionally designed
              templates.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-3 ">Upgrade Resume</h3>
            <p>Import your existing resume and enhance it with our tools.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-3">ATS Score Checker</h3>
            <p>
              Ensure your resume passes through Applicant Tracking Systems with
              our scoring tool.
            </p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-3">AI Suggestions</h3>
            <p>
              Receive personalized suggestions to improve your resume content.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
