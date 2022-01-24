import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {logout,selectActiveUser, selectIsAuthenticated } from "../store/auth";


export default function NavBar() {
const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="navbar navbar-dark bg-light">
     {isAuthenticated ? (
        <ul className="nav">
        <li className="nav-item">
        <Link className="nav-link" to="/">Gradebooks</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/teachers">All Professors</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/my-gradebook">My Gradebook</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/gradebooks/create">Add Gradebook</Link>
      </li>
          <button type="button" className="btn btn-primary" onClick={handleLogout}>Logout</button>
          </ul>
        ) : (
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
          </ul>
        )} 
    </nav> 
  );
}