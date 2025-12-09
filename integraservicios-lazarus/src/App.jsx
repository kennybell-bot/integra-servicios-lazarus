import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import RegisterForm from './pages/RegisterForm.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import SignInFormd from './pages/SignInFormd.jsx'
import SignedInNavigationBar from './components/singedInNavigationBar.jsx'
import AdminOptionsBar from './components/adminOptionsBar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Resources from './pages/Resources.jsx'
import ReservationsAdmin from './pages/ReservationsAdmin.jsx'
import Ratings from './pages/Ratings.jsx'



function App() {
  const [showRegister, setShowRegister] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)

  const handleRegisterClick = () => {
    setShowRegister(true)
    setShowSignIn(false)
  }

  const handleSignInClick = () => {
    setShowSignIn(true)
    setShowRegister(false)
  }

  const handleLogoClick = () => {
    setShowRegister(false)
    setShowSignIn(false)
  }

  const handleSignInSuccess = () => {
    // Called when SignInFormd reports successful sign-in
    setIsSignedIn(true)
    setShowSignIn(false)
  }

  const handleSignOut = () => {
    // Return to public view
    setIsSignedIn(false)
    setShowRegister(false)
    setShowSignIn(false)
  }

  const [adminView, setAdminView] = useState('dashboard')

  const handleAdminSelect = (view) => {
    setAdminView(view)
  }

  return (
    <div>
      {isSignedIn ? (
        /* Cuando el usuario está autenticado, mostrar solo la barra y las opciones de admin */
        <>
          <SignedInNavigationBar onSignOut={handleSignOut} />
          <AdminOptionsBar onSelect={handleAdminSelect} active={adminView} />
          {adminView === 'dashboard' && <Dashboard />}
          {adminView === 'resources' && <Resources />}
          {adminView === 'bookings' && <ReservationsAdmin />}
          {adminView === 'ratings' && <Ratings />}
          {/* other views (ratings) can be added similarly */}
        </>
      ) : (
        /* Vista pública: NavigationBar + contenido (SignIn / Register / Home) */
        <>
          <NavigationBar onRegisterClick={handleRegisterClick} onLogoClick={handleLogoClick} onSignInClick={handleSignInClick} />
          {showSignIn ? (
            <SignInFormd onSignInSuccess={handleSignInSuccess} />
          ) : showRegister ? (
            <RegisterForm />
          ) : (
            <Home />
          )}
        </>
      )}
    </div>
  )
}

export default App
