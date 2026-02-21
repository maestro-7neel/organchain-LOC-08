import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import FamilyTracker from "./views/FamilyTracker";

function Dashboard() {
  return <h1>Dashboard</h1>;
}

function Hospital() {
  return <h1>Hospital View</h1>;
}

export default function App() {

  return (

    <BrowserRouter>

      <nav style={{padding:"20px", background:"#111"}}>

        <Link to="/" style={{marginRight:"20px", color:"white"}}>
          Dashboard
        </Link>

        <Link to="/hospital" style={{marginRight:"20px", color:"white"}}>
          Hospital
        </Link>

        <Link to="/track" style={{color:"white"}}>
          Track Organ
        </Link>

      </nav>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/hospital" element={<Hospital />} />

        <Route path="/track" element={<FamilyTracker />} />

      </Routes>

    </BrowserRouter>

  );

}