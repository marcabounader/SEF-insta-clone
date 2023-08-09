import React from 'react'
import { button } from 'react-router-dom'
import { ReactComponent as Logo } from '../../instagram-logo.svg'
import './nav.css'

// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

const NavBar = ({handleOpenSearch, handleMyPosts,handleOpenAddModal,logout}) => {
  return (
    <nav className="nav-container flex-col">
          <Logo className="insta-logo"/>
          <div className='nav-subcontainer flex-col between'>
            <button onClick={()=>{handleMyPosts(false)}}>
                <span>
                  <i class="fa-solid fa-house"></i>
                  <span>Home</span>
                </span>
              </button>

              <button onClick={handleOpenSearch}>
                <span>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <span>Search</span>
                  </span>
              </button>
            <button onClick={handleOpenAddModal}>
              <span>
                <i class="fa-solid fa-square-plus"></i>
                <span>Add Post</span>
              </span>
            </button>

            <button onClick={()=>{handleMyPosts(true)}}>
              <span>
                <i class="fa-solid fa-user"></i>
                <span>Profile</span>
              </span>
            </button>
            <i className="fa-solid fa-right-from-bracket" onClick={logout}></i>

          </div>

    </nav>
  )
}
export default NavBar