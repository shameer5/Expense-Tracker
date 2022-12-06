import styles from './Home.module.css'
import deleteIcon from '../../assets/deleteIcon.svg'
import { useWrite } from '../../hooks/useWrite'

const TransactionCategory = (transaction) => {
    const {transaction: tx} = transaction
    const { deleteDocument } = useWrite(`users/${tx.uid}/transactions`)
    
  return (
    <li key={tx.id}>
        <p className={styles.name}>{tx.name}</p>
        <p className={styles.amount}>₹{tx.amount}</p>
        <span onClick={() => deleteDocument(tx.id)}>
        <img src={deleteIcon} alt='delete' />
        </span>
    </li>
  )
}

export default TransactionCategory