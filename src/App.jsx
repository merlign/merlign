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
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ProtocolPage from './pages/ProtocolPage';
import Advies from './pages/Advies';
import NotFound from './pages/NotFound';

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Landing page without standard Layout */}
                <Route path="/website-lp" element={<Advies />} />

                {/* Default pages with Layout */}
                <Route
                    path="/*"
                    element={
                        <Layout>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/over-mij" element={<About />} />
                                <Route path="/cases" element={<Cases />} />
                                <Route path="/contact" element={<ContactPage />} />
                                <Route path="/website" element={<WebsiteService />} />
                                <Route path="/dashboard" element={<DashboardService />} />
                                <Route path="/automatisering" element={<AutomationService />} />
                                <Route path="/privacy" element={<Privacy />} />
                                <Route path="/terms" element={<Terms />} />
                                <Route path="/het-protocol" element={<ProtocolPage />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </Layout>
                    }
                />
            </Routes>
        </Router>
    );
}
