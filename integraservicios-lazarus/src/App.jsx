import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import RegisterForm from './pages/RegisterForm.jsx'
import NavigationBar from './components/NavigationBar.jsx'


function App() {
  const [showRegister, setShowRegister] = useState(false)

  const handleRegisterClick = () => setShowRegister(true)
  const handleLogoClick = () => setShowRegister(false)

  return (
    <div>
      <NavigationBar onRegisterClick={handleRegisterClick} onLogoClick={handleLogoClick} />
      {showRegister ? (
        <RegisterForm />
      ) : (
        <Home onRegisterClick={handleRegisterClick} />
      )}
    </div>
  )
}

export default App
