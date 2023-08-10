import React from 'react'
import { button } from 'react-router-dom'
import { ReactComponent as Logo } from '../../instagram-logo.svg'
import './nav.css'

// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'

const NavBar = ({handleOpenSearchModal, handleMyPosts,handleOpenAddModal,logout}) => {
  return (
    <aside className="nav-container flex-col">
          <header className="sidebar-header">
            <Logo className="insta-logo"/>
            <i className="fa-brands fa-instagram"></i>
          </header>
          <nav>
            <button onClick={()=>{handleMyPosts(false)}}>
                <span>
                  <i className="fa-solid fa-house"></i>
                  <span>Home</span>
                </span>
              </button>

              <button onClick={handleOpenSearchModal}>
                <span>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <span>Search</span>
                  </span>
              </button>
            <button onClick={handleOpenAddModal}>
              <span>
                <i className="fa-solid fa-square-plus"></i>
                <span>Add Post</span>
              </span>
            </button>

            <button onClick={()=>{handleMyPosts(true)}}>
              <span>
                <i className="fa-solid fa-user"></i>
                <span>Profile</span>
              </span>
            </button>

            <button onClick={logout}>
              <span>
                <i className="fa-solid fa-right-from-bracket"></i>
                <span>Logout</span>
              </span>
            </button>
          </nav>
    </aside>
  )
}
export default NavBar