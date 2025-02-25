import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import {
  About,
  Contact,
  Dashboard,
  HomePage,
  Login,
  CheckAtsScore,
  ResumeEnhancer,
  CreateResume,
} from "./pages";
// import AuthLayout from "./AuthLayout.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/ats-score" element={<CheckAtsScore />} />
      <Route path="/enhance-resume" element={<ResumeEnhancer />} />
      <Route path="/create-resume" element={<CreateResume />} />
      {/* <Route path="/register" element={<RegisterPage />} />
       */}
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
