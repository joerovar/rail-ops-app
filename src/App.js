import { Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import { DashboardFPark, DashboardOHare, DashboardUIC} from "./routes/Dashboard";
import React from "react";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='content'>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route path={"/dashboardOHare"} element={<DashboardOHare />} />
          <Route path={"/dashboardFPark"} element={<DashboardFPark />} />
          <Route path={"/dashboardUIC"} element={<DashboardUIC />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
