import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadsList from './components/LeadsList';
import AddLeadForm from './components/AddLeadForm';
import Navigation from './components/Navigation'
import Home from './components/Home';

const AppRoutes = () => (
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allLead" element={<LeadsList />} />
      <Route path="/addLead" element={<AddLeadForm />} />
    </Routes>
  </Router>
);

export default AppRoutes;
