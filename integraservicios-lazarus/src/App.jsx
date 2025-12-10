import { useState, useEffect } from 'react'
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
import UserOptionsBar from './components/userComponents/userOptionsBar.jsx'
import UserCatalog from './pages/user/UserCatalog.jsx'
import UserReservations from './pages/user/UserReservations.jsx'


function App() {
  const [showRegister, setShowRegister] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [userInfo, setUserInfo] = useState(null)
  const [currentComponent, setCurrentComponent] = useState(null)

  // Hydrate session from sessionStorage on load
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('userInfo')
      if (stored) {
        const parsed = JSON.parse(stored)
        setUserInfo(parsed)
        setUserRole(parsed?.role || null)
        setIsSignedIn(true)
      }
    } catch (err) {
      console.error('Error leyendo sessionStorage userInfo:', err)
    }
  }, [])

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

  const handleSignInSuccess = (userData) => {
    // Called when SignInFormd reports successful sign-in with user data
    setIsSignedIn(true)
    setShowSignIn(false)
    setUserRole(userData?.role || null)
    setUserInfo(userData || null)
    try {
      sessionStorage.setItem('userInfo', JSON.stringify(userData || {}))
    } catch (err) {
      console.error('No se pudo guardar userInfo en sessionStorage:', err)
    }
    console.log('User signed in:', userData)
  }

  const handleSignOut = async () => {
    // Llamar logout en backend si hay username
    const username = userInfo?.username
    if (username) {
      try {
        await fetch(`http://localhost:8083/api/auth/logout?username=${encodeURIComponent(username)}`, {
          method: 'POST'
        })
        console.log('Finos con la cerrada de sesion')
      } catch (err) {
        console.error('Error en logout:', err)
      }
    }

    // Return to public view
    setIsSignedIn(false)
    setShowRegister(false)
    setShowSignIn(false)
    setUserRole(null)
    setUserInfo(null)
    try {
      sessionStorage.removeItem('userInfo')
    } catch (err) {
      console.error('No se pudo limpiar sessionStorage:', err)
    }
    setCurrentComponent(null)
  }

  const [adminView, setAdminView] = useState('dashboard')

  const handleAdminSelect = (view) => {
    setAdminView(view)
  }

  return (
    <div>
      {isSignedIn ? (
        /* Usuario autenticado */
        <>
          <SignedInNavigationBar
            onSignOut={handleSignOut}
            fullName={userInfo?.fullName}
            role={userInfo?.role}
          />
          
          {userRole === 'ADMIN' ? (
            /* Vista ADMIN */
            <>
              <AdminOptionsBar onSelect={handleAdminSelect} active={adminView} />
              {adminView === 'dashboard' && <Dashboard />}
              {adminView === 'resources' && <Resources />}
              {adminView === 'bookings' && <ReservationsAdmin />}
              {adminView === 'ratings' && <Ratings />}
            </>
          ) : (
            /* Vista STUDENT */
            <>
              <UserOptionsBar 
                onCatalogClick={() => setCurrentComponent(<UserCatalog userInfo={userInfo} />)} 
                onMyReservationsClick={() => setCurrentComponent(<UserReservations userInfo={userInfo} />)} 
              />

              {currentComponent}
            </>
          )}
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
