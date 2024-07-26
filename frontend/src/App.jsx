import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LeadsList from './components/LeadsList';
import AddLeadForm from './components/AddLeadForm';
import Navigation from './components/Navigation'
import AppRoutes from './Routes';

function App() {
  return (
    <AppRoutes/>
  )
}

export default App
