import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const ResumeEnhancer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [enhancedResume, setEnhancedResume] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleFileChange = (event) => {
    setResumeFile(event.target.files[0]);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setEnhancedResume("");
    setLoading(true); // Set loading to true

    if (!resumeFile || !jobTitle) {
      setError("Please upload a resume and enter a job title.");
      setLoading(false); // Reset loading state
      return;
    }

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobTitle", jobTitle);

    try {
      const response = await fetch("http://localhost:3000/api/enhance-resume", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to enhance resume");
      }

      const data = await response.json();
      setEnhancedResume(data.enhancedResume); // Set the enhanced resume text
    } catch (err) {
      console.error(err);
      setError("Error enhancing the resume. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Resume Enhancer</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="resume">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              accept="application/pdf"
              onChange={handleFileChange}
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="jobTitle"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={handleJobTitleChange}
              placeholder="Enter the job title"
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition duration-200"
            disabled={loading}
          >
            {loading ? "Enhancing..." : "Enhance Resume"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
      {enhancedResume && (
        <div className="mt-4 w-[80%] ">
          <h2 className="text-2xl justify-self-center font-bold py-2 mb-4 w-fit bg-white p-5 drop-shadow-md rounded-lg ">
            Enhanced Resume
          </h2>
          <div className=" bg-white p-8 flex flex-col gap-2 drop-shadow-md rounded-lg" >
            <ReactMarkdown>{enhancedResume}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeEnhancer;
