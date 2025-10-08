import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";
import Header from "./components/Header";
import './App.css';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route path="/" element={<Navigate to="/list" replace />} />
      <Route path="/list" element={<ListView />} />
      <Route path="/gallery" element={<GalleryView />} />
      <Route path="/detail/:id" element={<DetailView/>} />
    </Routes>
    </>
  );
}

export default App;

