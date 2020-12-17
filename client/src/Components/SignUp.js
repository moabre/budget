import React, { useCallback } from 'react'
import { withRouter } from 'react-router'
import app from '../firebase'
import './SignUp.scss'

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  return (
    <div className='login'>
      <form onSubmit={handleSignUp} className='login__form'>
        <h1 className='login__title'>Sign up</h1>
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
        <button type='submit' className='button__login'>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default withRouter(SignUp)
