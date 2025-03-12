import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Payment from "./pages/Payment";

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/payment">Payment</Link>
      </nav>
      <Routes>
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
};

export default App;
