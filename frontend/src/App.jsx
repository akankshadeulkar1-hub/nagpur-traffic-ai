import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import CommandDashboard from './components/CommandDashboard';
import './App.css';

/**
 * App Component - Top Level State Orchestrator
 * Controls state across 4 distinct screens:
 * 1. Screen 1: Splash Screen (Auto-dismisses after 2.5s)
 * 2. Screen 2: Introductory / Landing Page (Separate Full Screen)
 * 3. Screen 3: Dedicated Authorization & Login Page (Y-axis Slide Down)
 * 4. Screen 4: Live Tactical Command Dashboard
 */
function App() {
  // Screen state: 'SPLASH' | 'LANDING' | 'LOGIN' | 'AUTHENTICATING' | 'DASHBOARD'
  const [currentScreen, setCurrentScreen] = useState('SPLASH');
  const [userAuth, setUserAuth] = useState({
    isAuthenticated: false,
    badgeId: 'NGP-TP-8841',
    sector: 'Sitabuldi Zone',
  });
  const [authError, setAuthError] = useState('');

  // Screen 1 -> Screen 2 Transition
  const handleSplashComplete = () => {
    setCurrentScreen('LANDING');
  };

  // Screen 2 -> Screen 3 Transition (Triggered by PROCEED TO OFFICER AUTHENTICATION ↓)
  const handleProceedToAuth = () => {
    setCurrentScreen('LOGIN');
  };

  // Screen 3 -> Screen 2 Back Transition (Triggered by ↑ Return to System Overview)
  const handleBackToLanding = () => {
    setCurrentScreen('LANDING');
  };

  // Screen 3 -> Screen 4 Transition (Triggered by VERIFY & ENTER COMMAND CENTER)
  const handleAuthenticate = ({ badgeId, sector }) => {
    setAuthError('');
    setCurrentScreen('AUTHENTICATING');

    // 0.5s loading authentication token spinner overlay before entering Screen 4
    setTimeout(() => {
      setUserAuth({
        isAuthenticated: true,
        badgeId: badgeId || 'NGP-TP-8841',
        sector: sector || 'Sitabuldi Zone',
      });
      setCurrentScreen('DASHBOARD');
    }, 550);
  };

  // Logout / Lock Gateway
  const handleLogout = () => {
    setUserAuth({
      isAuthenticated: false,
      badgeId: 'NGP-TP-8841',
      sector: 'Sitabuldi Zone',
    });
    setCurrentScreen('LANDING');
  };

  // Reset to Splash
  const handleResetToSplash = () => {
    setCurrentScreen('SPLASH');
  };

  return (
    <div className="relative min-h-screen bg-[#0B0E14] text-slate-100 font-sans selection:bg-[#00D8F6] selection:text-black overflow-x-hidden">
      
      {/* Screen 1: Splash Screen */}
      {currentScreen === 'SPLASH' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Screen 2: Introductory / Landing Page (Always rendered behind Screen 3 for seamless Y-axis slide down) */}
      {currentScreen !== 'SPLASH' && currentScreen !== 'DASHBOARD' && (
        <LandingPage
          onProceedToAuth={handleProceedToAuth}
          onResetToSplash={handleResetToSplash}
        />
      )}

      {/* Screen 3: Dedicated Authorization & Login Page (Slides down along Y-axis) */}
      {(currentScreen === 'LOGIN' || currentScreen === 'AUTHENTICATING') && (
        <LoginPage
          isOpen={currentScreen === 'LOGIN' || currentScreen === 'AUTHENTICATING'}
          onBackToLanding={handleBackToLanding}
          onAuthenticate={handleAuthenticate}
          authError={authError}
          isAuthenticating={currentScreen === 'AUTHENTICATING'}
        />
      )}

      {/* Screen 4: Live Tactical Command Dashboard */}
      {currentScreen === 'DASHBOARD' && userAuth.isAuthenticated && (
        <CommandDashboard
          userSector={userAuth.sector}
          badgeId={userAuth.badgeId}
          onLogout={handleLogout}
        />
      )}

    </div>
  );
}

export default App;
