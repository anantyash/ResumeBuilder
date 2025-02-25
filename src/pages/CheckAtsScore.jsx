import React, { useState } from "react";

const CheckAtsScore = () => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleJobDescriptionChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setAtsScore(null);
    setLoading(true); // Set loading to true

    if (!resume) {
      setError("Please upload a resume.");
      setLoading(false); // Reset loading state
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://localhost:3000/api/resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { score } = data.score;
        // console.log("data: ",score);
        setAtsScore(score);
        setIsModalOpen(true);
        // throw new Error(errorData.message || "Network response was not ok");
      } else {
        const data = await response.json();
        console.log("message", data);
      }
    } catch (err) {
      console.error(err);
      setError("Error checking ATS score. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6">Check ATS Score</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="resume">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              id="resume"
              accept="application/pdf"
              onChange={handleResumeChange}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="jobDescription"
            >
              Job Description
            </label>
            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={handleJobDescriptionChange}
              className="border border-gray-300 p-2 w-full rounded"
              rows="4"
              placeholder="Paste the job description here..."
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Checking..." : "Check ATS Score"}
          </button>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md w-96">
              <h2 className="text-2xl font-bold mb-4">ATS Score</h2>
              <p className="text-xl mb-4">
                Your ATS Score: <span className="font-bold">{atsScore}</span>
              </p>
              <p className="text-gray-600 mb-6">
                This score indicates how well your resume matches the job
                description.
              </p>
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckAtsScore;
