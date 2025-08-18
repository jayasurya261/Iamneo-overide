import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import VideoBackground from "./components/ui-caller/VideoBackground";
import BookATable from "./components/book-a-table";
import ListReservation from "./components/ListReservation";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book-a-table" element={<BookATable/>} />
        <Route path="/reservation-list" element={<ListReservation/>} />
       
      </Routes>
    </Router>
  );
};

export default App;
