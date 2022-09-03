import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className="mt-5 mb-5 flex items-center gap-x-4 list-none underline ">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/signup">Signup</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li>
                <Link to="/ForgetPassword">忘記密碼</Link>
            </li>
            <li>
                <Link to="/profile">會員資料</Link>
            </li>
        </nav>
    );
}

export default Nav;