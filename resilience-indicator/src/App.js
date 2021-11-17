import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SurveyListPage from "./pages/SurveyListPage";
import SurveyPage from "./pages/SurveyPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NabBar";
import "./App.css";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" >
          <NavBar />
          <div id="page-body">
            <Routes>
              <Route path="/" element={<HomePage />} exact />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/survey-list" element={<SurveyListPage />} />
              <Route path="/survey/:name" element={<SurveyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;