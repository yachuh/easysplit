import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom'
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
import PayBillPage from './pages/PayBillPage'
import { JoinGroupModal } from './components/group/GroupModal'

// group 相關
import GroupPage from './pages/GroupPage'
import GroupListPage from './pages/GroupListPage'
import GroupHomePage from './pages/GroupHomePage'
import GroupMemberPage from './pages/GroupMemberPage'
import GroupSettingPage from './pages/GroupSettingPage'
// expense 相關
import SingleExpensePage from './pages/SingleExpensePage'
// landing page 相關
import StillMorePage from './pages/StillMorePage'
import FaqPage from './pages/FaqPage'
import ErrorPage from './pages/ErrorPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

function App () {
  const [token, setToken] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()
  const background = location.state && location.state.background

  const handleLogout = () => {
    setAuthToken(null)
    navigate('/', { replace: true })
  }

  useEffect(function () {
    Aos.init({ duration: 1000 })
  }, [])

  return (
    <>
      <Routes location={background || location}>
        {/* index 相關 */}
        <Route index element={<HomePage />} />
        <Route path="/stillmore" element={<StillMorePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        <Route path="/payBill" element={<PayBillPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="nav" handleLogout={handleLogout} element={<Nav />} />
        {/* signup & login 相關 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
        <Route path="/AuthMail/AccountActivation" element={<AccountActivationPage />} />
        <Route path="/AuthMail/ResetPassword" element={<ResetPwdPage />} />
        {/* <Route path="AuthMail/GroupInvitation" element={<JoinGroupModal />} /> */}
        {/* user 相關 */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        {/* group 相關 */}
        <Route path="/group" element={<GroupListPage />} />
        <Route path="/group/:groupId" element={<GroupPage />}>
          <Route index element={<GroupHomePage />} />
          {/* <Route path="/" element={<GroupHomePage />} /> */}
          <Route path="member" element={<GroupMemberPage />} />
          <Route path="setting" element={<GroupSettingPage />} />
          <Route path=":expenseId" element={<SingleExpensePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
