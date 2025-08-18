import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import BookATable from "./components/book-a-table";
import ListReservation from "./components/ListReservation";
import ReservationAdminPanel from "./components/ReservationAdminPanel";

// Clerk imports
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import VideoBackground from "./components/ui-caller/VideoBackground";

const App = () => {
  return (
    <Router>
      <header className="flex justify-between items-center px-6 py-4 bg-black text-black">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-white font-playfair">
         Veloria
        </h1>

        <div>
          <SignedOut>
            <SignInButton>
              <button
                className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-blue-500/30 backdrop-blur-lg px-6 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-blue-600/50 border border-white/20"
              >
                <span className="text-lg">Sign In</span>
                <div
                  className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                >
                  <div className="relative h-full w-10 bg-white/30"></div>
                </div>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      <SignedIn>
        {/* Only authenticated users can access app routes */}
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-a-table" element={<BookATable />} />
          <Route path="/reservation-list" element={<ListReservation />} />
          <Route path="/admin" element={<ReservationAdminPanel />} />
        </Routes>
      </SignedIn>

      <SignedOut>
        <div className="text-center text-xl text-black">
         
          <VideoBackground/>
        </div>
      </SignedOut>
    </Router>
  );
};

export default App;
