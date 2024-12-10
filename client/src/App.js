import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Modes from './pages/Modes';
import Classic from './pages/Classic';
import StoryMode from './pages/StoryMode';
import CustomBoards from './pages/CustomBoards';
import Profile from './pages/Profile';
import Store from './pages/Store';
import Tutorial from './pages/Tutorial';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Modes />} />
        <Route path="/modes" element={<Modes />} />
        <Route path="/classic" element={<Classic />} />
        <Route path="/story" element={<StoryMode />} />
        <Route path="/custom" element={<CustomBoards />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/store" element={<Store />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </Router>
  );
}

export default App;
