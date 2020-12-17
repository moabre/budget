import './Header.scss'
import app from '../../firebase'
import React from 'react'
import logo from '../../assets/Unknown.svg'
import { Link, NavLink, useLocation } from 'react-router-dom'

function Header() {
  const { pathname } = useLocation()
  const query = useLocation().pathname
  let word = query.split('/')
  let id = word[2]
  let editid = word[3]

  return (
    <div className='header'>
      <Link to='/' className='header__link'>
        <img src={logo} className='header__logo' alt='instock logo'></img>
      </Link>
      <div className='header__button'>
        <NavLink
          strict
          to='/'
          isActive={() =>
            [
              '/warehouse',
              '/',
              `/warehouse/${id}`,
              `/warehouse/edit/${editid}`,
            ].includes(pathname)
          }
          activeClassName='active'
          className='button__warehouse'
        >
          Home
        </NavLink>
        <NavLink
          strict
          to='/home'
          activeClassName='active'
          className='button__inventory'
        >
          Inputs
        </NavLink>
        <div class='dropdown'>
          <button class='dropbtn'>▼</button>
          <div class='dropdown-content'>
            <p onClick={() => app.auth().signOut()}>Logout</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
