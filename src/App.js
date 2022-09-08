import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/context'
import { setAuthToken, getAuthToken } from './utils/utils'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AccountActivationPage from './pages/AccountActivationPage'
import ForgetPwdPage from './pages/ForgetPwdPage'
import ProfilePage from './pages/ProfilePage'

function App () {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState({
    email: '',
    nickname: ''
  })

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
  }, [])

  return (
    <div className="container mx-auto">
      <AuthContext.Provider value={ { token, setToken, user, setUser } }>
        <Nav handleLogout={handleLogout}/>
        <Routes>
          <Route index element={<HomePage />} />
          {/* <Route path={"/#AuthMail"}>
            <Route path="AccountActivation" element={<AccountActivationPage />} />
          </Route> */}
          <Route path="/AuthMail/AccountActivation" element={<AccountActivationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/ForgetPassword" element={<ForgetPwdPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  )
}

export default App
