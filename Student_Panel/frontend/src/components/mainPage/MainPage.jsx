import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Dropdown from "./Dropdown";
import Navbar2 from "../navbar2/Navbar2";
import MbtiTest from "../mbti/MbtiTest";
import DiscTest from "../disc/DiscTest";
import OceanTest from "../ocean/OceanTest";
import RiasecTest from "../riasec/RiasecTest";
import EmotionalIntelligenceTest from "../emotionalintelligence/EmotionalIntelligenceTest";
import HireMeeTest from "../hiremee/HireMeeTest";

function MainPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar2 />

      <div className="pt-20 px-8 md:px-16 lg:px-32">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1 className="text-3xl font-bold mt-8">
                  Please refer to your psychometric reports and enter your
                  values accordingly
                </h1>
                <Dropdown />
                <div className="mt-8 text-lg">
                  <h2 className="text-2xl font-bold mb-4">
                    Step by Step Guide:
                  </h2>
                  <ol className="list-decimal list-inside">
                    <li>
                      Select a Test: Use the dropdown menu to choose the
                      specific test for which you want to enter values.
                    </li>
                    <li>
                      Enter Your values: Fill in your values for each section of
                      the test.
                    </li>
                    <li>
                      Click on the submit button to generate graphs based on
                      your evaluation.
                    </li>
                    <li>
                      In case If you've submitted incorrect values, revisit the
                      test, update the parameters, and submit again.
                    </li>
                  </ol>
                </div>
              </>
            }
          />
          <Route path="/mbti" element={<MbtiTest />} />
          <Route path="/disc" element={<DiscTest />} />
          <Route path="/ocean" element={<OceanTest />} />
          <Route path="/riasec" element={<RiasecTest />} />
          <Route
            path="/emotional-intelligence"
            element={<EmotionalIntelligenceTest />}
          />
          <Route path="/hiremee" element={<HireMeeTest />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainPage;
