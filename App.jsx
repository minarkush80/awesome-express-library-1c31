import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import TemplatesPage from './components/TemplatesPage';
import ProjectDetails from './components/ProjectDetails';
import OrderPage from './components/OrderPage';
import ContactPage from './components/ContactPage';
import PricingPage from './components/PricingPage';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function AppContent() {
  const { logoVersion } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }
  
  return (
    <div 
      className={`min-h-screen bg-white logo-background ${logoVersion === 'v1' ? 'logo-v1' : 'logo-v2'}`}
      style={{
        transform: `translateY(${scrollY * 0.1}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      <Header />
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage scrollY={scrollY} />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/project/:projectId" element={<ProjectDetails />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;

