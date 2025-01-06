import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Firstpage1 from "./components/firstpage1/Firstpage1";
import Form1 from "./components/createaccount/Form1";
import Login1 from "./components/login1/Login1";
import Dashboard1 from "./components/dashboard/Dashboard1";
import Datapage from "./components/datapage/Datapage";
import Chart from "./components/Charts/Charts";
import Charts from "./components/Charts/Charts";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Firstpage1 />} />
        <Route path="/form1" element={<Form1 />} />
        <Route path="/login" element={<Login1 />} />
        <Route path="/dashboard1" element={<Dashboard1 />} />
        <Route path="/datapage" element={<Datapage />} />
        <Route path="/charts/:studentId" element={<Charts />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import Datapage from "./components/datapage/Datapage";
// function App() {
//   return (
//     <div>
//       <Datapage />
//     </div>
//   );
// }
// export default App;
