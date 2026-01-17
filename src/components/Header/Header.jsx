import React from 'react'
import PropTypes from 'prop-types'
import style from './Header.module.scss'
import { BsCalendar3, BsCalendar4Week } from 'react-icons/bs'
import { IoTodayOutline } from 'react-icons/io5'

function Header(props) {
  return (
    <header className={style.wrapper}>
      <nav className={style.navBar}>
        <a href="" className={style.link}>Main</a>
        <a href="" className={style.link}>
          <BsCalendar3 />
          <span>Month</span>
        </a>
        <a href="" className={style.link}>
          <BsCalendar4Week />
          <span>Week</span>
        </a>
        <a href="" className={style.link}>
          <IoTodayOutline />
          <span>Day</span>
        </a>
      </nav>
    </header>
  )
}

Header.propTypes = {}

export default Header
