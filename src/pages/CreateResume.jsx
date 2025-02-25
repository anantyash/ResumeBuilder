import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const CreateResume = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [template, setTemplate] = useState("template1");
  const [generatedResume, setGeneratedResume] = useState("");

  const templates = {
    template1: {
      title: "Simple Resume",
      content: `
# ${name}

## Contact Information
- Email: ${email}
- Phone: ${phone}

## Summary
${summary}

## Skills
${skills
  .split(",")
  .map((skill) => `- ${skill.trim()}`)
  .join("\n")}

## Experience
${experience}

## Education
${education}
      `,
    },
    template2: {
      title: "Modern Resume",
      content: `
# ${name}

## Contact
- **Email:** ${email}
- **Phone:** ${phone}

## About Me
${summary}

## Skills
${skills
  .split(",")
  .map((skill) => `- ${skill.trim()}`)
  .join("\n")}

## Work Experience
${experience}

## Education
${education}
      `,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedTemplate = templates[template];
    setGeneratedResume(selectedTemplate.content);
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-[80%]">
        <h1 className="text-3xl font-bold mb-6">Create Your Resume</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="summary">
              Summary
            </label>
            <textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              rows="3"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="skills">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="experience"
            >
              Work Experience
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="education"
            >
              Education
            </label>
            <textarea
              id="education"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
              rows="2"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="template"
            >
              Select Template
            </label>
            <select
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded"
            >
              <option value="template1">Simple Resume</option>
              <option value="template2">Modern Resume</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Generate Resume
          </button>
        </form>
      </div>
      {generatedResume && (
        <div className="mt-6 w-[80%] ">
          <h2 className="text-2xl font-bold mb-4">Generated Resume:</h2>
          <pre className="bg-white p-4 rounded border border-gray-300 whitespace-pre-wrap">
            <ReactMarkdown>{generatedResume}</ReactMarkdown>
          </pre>
        </div>
      )}
    </div>
  );
};

export default CreateResume;
