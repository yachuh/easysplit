import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { setAuthToken, getAuthToken } from './utils/utils'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AccountActivationPage from './pages/AccountActivationPage'
import ForgetPasswordPage from './pages/ForgetPasswordPage'
import ProfilePage from './pages/ProfilePage'

function App () {
  const [token, setToken] = useState(null)

  const navigate = useNavigate()

  const handleLogout = () => {
    setToken(null)
    setAuthToken(null)
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (getAuthToken()) {
      setToken(getAuthToken())
      console.log('app.js', token)
    }
  }, [token, setToken])

  useEffect(function () {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <>
        {/* <Nav handleLogout={handleLogout} /> */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="nav" handleLogout={handleLogout} element={<Nav />} />
          {/* <Route path={"/#AuthMail"}>
          <Route path="AccountActivation" element={<AccountActivationPage />} />
        </Route> */}
          <Route path="/AuthMail/AccountActivation" element={<AccountActivationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
    </>
  )
}

export default App
