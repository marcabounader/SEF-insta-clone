import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../../instagram-logo.svg'
import './nav.css'

// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

const NavBar = ({handleOpenSearch}) => {
  return (
    <nav className="nav-container">
      <div>
        <ul>
          <li>
          <Logo className="insta-logo"/>
          </li>
          <li>
          <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li>
          <NavLink onClick={handleOpenSearch}>Search</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar