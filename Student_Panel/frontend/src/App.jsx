import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import First_Page from "./components/first_page/First_Page";
import Form from "./components/form/Form";
import LoginPage from "./components/login/Login";
import MbtiTest from "./components/mbti/MbtiTest";
import DiscTest from "./components/disc/DiscTest";
import OceanTest from "./components/ocean/OceanTest";
import RiasecTest from "./components/riasec/RiasecTest";
import EmotionalIntelligenceTest from "./components/emotionalintelligence/EmotionalIntelligenceTest";
import HireMeeTest from "./components/hiremee/HireMeeTest";
import MainPage from "./components/mainPage/MainPage";
import Chart from "./components/Charts/Charts";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

const App = () => {
  return (
    
    <Router>
      <Routes>
        
        <Route path="/" element={<First_Page />} />
        <Route path="/form" element={<Form />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/mbti" element={<PrivateRoute><MbtiTest /></PrivateRoute>} />
        <Route path="/disc" element={<PrivateRoute><DiscTest /></PrivateRoute>} />
        <Route path="/ocean" element={<PrivateRoute><OceanTest /></PrivateRoute>} />
        <Route path="/riasec" element={<PrivateRoute><RiasecTest /></PrivateRoute>} />
        <Route path="/emotional-intelligence" element={<PrivateRoute><EmotionalIntelligenceTest /></PrivateRoute>} />
        <Route path="/hiremee" element={<PrivateRoute><HireMeeTest /></PrivateRoute>} />
        <Route path="/mainPage" element={<PrivateRoute><MainPage /></PrivateRoute>} />
        <Route path="/results" element={<PrivateRoute><Chart /></PrivateRoute>} />

      </Routes>
    </Router>
  );
};

export default App;
