import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Cases from './pages/Cases';
import ContactPage from './pages/Contact';
import WebsiteService from './pages/services/WebsiteService';
import DashboardService from './pages/services/DashboardService';
import AutomationService from './pages/services/AutomationService';

export default function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/over-mij" element={<About />} />
                    <Route path="/cases" element={<Cases />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/website" element={<WebsiteService />} />
                    <Route path="/dashboard" element={<DashboardService />} />
                    <Route path="/automatisering" element={<AutomationService />} />
                </Routes>
            </Layout>
        </Router>
    );
}
