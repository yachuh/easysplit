import { Link } from 'react-router-dom'
import { Home, Person, Notifications } from '@mui/icons-material'
export default function SideNavMain () {
  return (
        <nav className="w-full flex flex-col gap-2 mb-10">
            <ul>
                <li>
                    <Link className="sideNavItem" to="/">
                      <Home className="sideNavItemIcon" />
                        首頁
                    </Link>
                </li>
                <li>
                    <Link className="sideNavItem" to="/profile">
                      <Person className="sideNavItemIcon" />
                        會員
                    </Link>
                </li>
                <li>
                    <Link className="sideNavItem" to="/notifications">
                        <Notifications className="sideNavItemIcon text-colors-fifth" />
                        通知
                    </Link>
                </li>
            </ul>

        </nav>
  )
}
