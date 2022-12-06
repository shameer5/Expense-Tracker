import { useState } from 'react'
import styles from './Login.module.css'
import {ReactComponent as Lock} from '../../assets/lock.svg'
import {ReactComponent as EmailIcon} from '../../assets/emailIcon.svg'
import { Link } from 'react-router-dom'
import { useLogin } from '../../hooks/useLogin'

const Login = () => {
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) =>{
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className={styles.container}>
    <div className={styles.login}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <h2>Login</h2>
          <h2>/</h2>
          <h2><Link to='/signup'>Sign Up</Link></h2>
        </div>
        <div className={styles.textbox}>
          <input 
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder='email'
          />
          <span>
            <EmailIcon className={styles.outlinedSymbol} />
          </span>
        </div>
        <div className={styles.textbox}>
          <input 
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='password'
            />
          <span className={styles.outlinedSymbol}>
            <Lock className={styles.outlinedSymbol} />
          </span>
        </div>
        {!isPending && <button className='btn'>Login</button>}
        {isPending && <button className='btn disable' disabled>Loading...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  )
}

export default Login