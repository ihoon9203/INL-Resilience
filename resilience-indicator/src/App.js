import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import TakeSurveyPage from "./pages/TakeSurveyPage";
import ReviewSurveyPage from "./pages/ReviewSurveyPage";
import DescriptionPage from "./pages/DescriptionPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Footer from "./components/Footer";
am4core.useTheme(am4themes_animated);

const DefaultContainer = () => (
  <><></>
    <NavBar />
    <div id="page-body">
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/take-survey/:name" element={<TakeSurveyPage />} />
        <Route path="/review-survey/:name" element={<ReviewSurveyPage />} />
        <Route path="/description/:name" element={<DescriptionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </>
)

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<DefaultContainer />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;