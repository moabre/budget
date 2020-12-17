import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import app from '../firebase'
import { AuthContext } from '../Auth'
import './Login.scss'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await app.auth().signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const handleSign = (event) => {
    event.preventDefault()
    let url = window.location.href.split('login', 1) + 'signup'
    window.location.href = url
  }

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to='/' />
  }

  return (
    <div className='login'>
      <form onSubmit={handleLogin} className='login__form'>
        <h1 className='login__title'>Log in</h1>
        <label className='label'>Email</label>
        <input
          name='email'
          type='email'
          placeholder='Email'
          className='label__input'
        />
        <label className='label'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          className='label__input'
        />
        <div className='button'>
          <button type='submit' className='button__login'>
            Login
          </button>
          <button type='submit' onClick={handleSign} className='button__login'>
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Login)
