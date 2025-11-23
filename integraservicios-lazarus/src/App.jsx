import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import RegisterForm from './pages/RegisterForm.jsx'
import NavigationBar from './components/NavigationBar.jsx'
import SignInFormd from './pages/SignInFormd.jsx'



function App() {
  const [showRegister, setShowRegister] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

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

  return (
    <div>
      <NavigationBar onRegisterClick={handleRegisterClick} onLogoClick={handleLogoClick} onSignInClick={handleSignInClick} />
      {showSignIn ? (
        <SignInFormd />
      ) : showRegister ? (
        <RegisterForm />
      ) : (
        <Home />
      )}
    </div>
  )
}

export default App
