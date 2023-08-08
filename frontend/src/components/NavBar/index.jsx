import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger } from './NavElement'
const NavBar = () => {
  return (
    <>
      <PrimaryNav>
        <Hamburger />
        <Menu>
          <MenuLink to="/" activeStyle>
            Home
          </MenuLink>
          <MenuLink to="/contacts" activeStyle>
            Contacts
          </MenuLink>
          <MenuLink to="/contacts/add" activeStyle>
            Add
          </MenuLink>
        </Menu>
      </PrimaryNav>
    </>
  )
}
export default NavBar