import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importing your components
import Home from './Components//Home/Home';
import Login from './Components/Login/Login';
import Scan from './Components/Scan/Scan';

import { supabase } from './supabaseClient';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check if a session already exists when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for any changes (Login, Logout, Password Recovery)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Жүктелуде...</div>;
  }

  return (
    <Router>
      <div className="App">
        {/* You can add a Navbar component here if you want it on every page */}
        
        <Routes>
          {/* Route for the Home page */}
          <Route path="/" element={<Home session={session} />} />

        {/* If logged in, redirect away from Login to Scan */}
        <Route 
          path="/login" 
          element={!session ? <Login /> : <Navigate to="/scan" />} 
        />

        {/* PROTECTED ROUTE: Only logged-in users can see the Scan page */}
        <Route 
          path="/scan" 
          element={session ? <Scan session={session} /> : <Navigate to="/login" />} 
        />

          {/* Optional: Catch-all route for 404 Not Found */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;