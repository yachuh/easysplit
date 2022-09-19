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
import ResetPwdPage from './pages/ResetPwdPage'
import NotificationPage from './pages/NotificationPage'
import GroupPage from './pages/GroupPage'
import StillMorePage from './pages/StillMorePage'
import FaqPage from './pages/FaqPage'
import ErrorPage from './pages/ErrorPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/AuthMail/AccountActivation" element={<AccountActivationPage />} />
        <Route path="/AuthMail/ResetPassword" element={<ResetPwdPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/group/:id" element={<GroupPage />} />
        <Route path="/stillmore" element={<StillMorePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
