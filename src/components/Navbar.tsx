import { Link, useNavigate } from 'react-router-dom';

type Props = {}

export default function Navbar({ }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate("/");
  }

  return (
    <div>
      <nav className="w-full fixed top-0 py-5 bg-black flex justify-end">
          <ul className="text-white text-xl uppercase flex space-x-4 mr-2">
            <li>
              <Link className="hover:text-gray-500" to="/homepage">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/summarypage">
                Summary
              </Link>
            </li>
            <li>
             <button className="hover:text-gray-500 text-xl uppercase" onClick={handleLogout}>
              Log out
            </button>
            </li>
          </ul>
      </nav>
    </div>
  )
}