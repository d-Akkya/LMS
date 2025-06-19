import React from "react";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import HeroSection from "./pages/student/HeroSection";

const App = () => {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Login />
    </main>
  );
};

export default App;
