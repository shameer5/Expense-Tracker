import { useState } from 'react'
import styles from './Signup.module.css'
import {ReactComponent as EmailIcon} from '../../assets/emailIcon.svg'
import {ReactComponent as Lock} from '../../assets/lock.svg'
import {ReactComponent as AccountCircle} from '../../assets/accountCircle.svg';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';

const Signup = () => {
  const[userName, setUserName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const {error, isPending, signup} = useSignup()

  const handleSubmit = (e) =>{
    e.preventDefault()
    signup(email, password, userName)
  }

  return (
    <div className={styles.container}>
    <div className={styles.signup}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <h2><Link to='/login'>Login</Link></h2>
          <h2>/</h2>
          <h2> Sign Up</h2>
        </div>
        <div className={styles.textbox}>
          <input 
            type='text'
            value={userName}
            onChange={e => setUserName(e.target.value)}
            placeholder='user name'
          />
          <span>
            <AccountCircle className={styles.outlinedSymbol} />
          </span>
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
            placeholder='set password'
            />
          <span className={styles.outlinedSymbol}>
            <Lock className={styles.outlinedSymbol} />
          </span>
        </div>
        {!isPending && (<button className='btn'>Signup</button>)}
        {isPending && (<button className='btn' disabled>loading...</button>)}
        { error && <p>error</p> }
        
      </form>
    </div>
    </div>
  )
}

export default Signup