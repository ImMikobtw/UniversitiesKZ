import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import MainPage from "./MainPage";
import UniPage from "./UniPage";
import OopPage from "./OopPage";
import "../styles/HomePage.css";

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  return (
    <div className="homepage-container">
      <Header />
      <div className="main-layout">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <main className={`content-area ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
          <Routes>
            <Route path="main" element={<MainPage />} />
            <Route path="uni" element={<UniPage />} />
            <Route path="oop" element={<OopPage />} />
            <Route path="/" element={<Navigate to="main" replace />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default HomePage;