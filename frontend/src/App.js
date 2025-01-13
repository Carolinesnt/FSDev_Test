import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddData from './pages/AddData';
import EditData from './pages/EditData';
import ViewData from './pages/ViewData';

const App = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddData />} />
        <Route path="/edit/:id" element={<EditData />} />
        <Route path="/view/:id" element={<ViewData />} />
      </Routes>
    </div>
  );
};

export default App;