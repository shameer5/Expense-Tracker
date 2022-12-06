import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}>myFinance</li>
            {user && (
              <>
              <li>Hello, {user.displayName}</li>
              <li className={styles.logout}>
                <button className='btn' onClick={logout}>Logout</button>
              </li>
              </>
              )
            }
            {!user && (
              <>
              <li><Link to='/login'>Login</Link></li>
              <li className={styles.signup}><Link to='/signup'>Signup</Link></li>
              </>
            )}
        </ul>
    </nav>
  )
}

export default Navbar