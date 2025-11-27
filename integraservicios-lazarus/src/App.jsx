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

  return (
    <div>
      {isSignedIn ? (
        /* Cuando el usuario está autenticado, mostrar solo la barra y las opciones de admin */
        <>
          <SignedInNavigationBar onSignOut={handleSignOut} />
          <AdminOptionsBar />
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
