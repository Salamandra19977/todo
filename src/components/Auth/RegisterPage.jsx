import React from 'react'
import PropTypes from 'prop-types'
import style from "./Auth.module.scss"
import { useForm } from 'react-hook-form'

function RegisterPage(props) {
  const {
    
  } = useForm()
  return (
    <div className={style.wrapper}>
        <h1>Register</h1>
        <form>
            <label htmlFor="login">Login</label>
            <input type="text" id="login" />
            <span></span>
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
            <span></span>
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" id='password' />
            <span></span>
            <br />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id='confirmPassword' />
            <span></span>
            <br />
            <button className={style.btn}>Register</button>
        </form>
    </div>
  )
}

RegisterPage.propTypes = {}

export default RegisterPage
