import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as am4core from '@amcharts/amcharts4/core';
import am4ThemesAnimated from '@amcharts/amcharts4/themes/animated';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import TakeSurveyPage from './pages/TakeSurveyPage';
import ReviewSurveyPage from './pages/ReviewSurveyPage';
import DescriptionPage from './pages/DescriptionPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer';

am4core.useTheme(am4ThemesAnimated);

const DefaultContainer = function DefaultContainerFunc() {
  return (
    <>
      <NavBar />
      <div id="page-body">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/home" element={<HomePage />} exact />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/take-survey/:name" element={<TakeSurveyPage />} />
          <Route path="/review-survey/:name" element={<ReviewSurveyPage />} />
          <Route path="/description/:name" element={<DescriptionPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

const App = function AppFunc() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<DefaultContainer />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
