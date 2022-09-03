import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import AccountActivationPage from './pages/AccountActivationPage'
import ForgetPwdPage from './pages/ForgetPwdPage'
import ProfilePage from './pages/ProfilePage'

function App () {
  return (
    <div className="container mx-auto">
      <Nav />
      <Routes>
        <Route index element={<HomePage />} />
        {/* <Route path={"/#AuthMail"}>
          <Route path="AccountActivation" element={<AccountActivationPage />} />
        </Route> */}
        <Route path={'AccountActivation'} element={<AccountActivationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ForgetPassword" element={<ForgetPwdPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
