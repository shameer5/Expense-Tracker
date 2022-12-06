import styles from './Home.module.css'
import TransactionCategory from './TransactionCategory'
import { useCategories } from '../../hooks/useCategories'
import { useState } from 'react'
import chevronIcon from '../../assets/chevronIcon.svg'

const TransactionList = ({transactions, setTotal}) => {

  const { results, categoryTotal } = useCategories( transactions, setTotal )

  return (
    <>
        {categoryTotal && results && results.map(res => (
            categoryTotal.map( (single, idx) => (
            single.category === res && (
              <CategoryItem transactions={transactions} res={res} single={single} key={idx} />
              ))
            )))
        }
    </>
  )
}

const CategoryItem = ({transactions, res, single}) => {

  const [isOpen, setOpen] = useState(false);

  return(
    <ul className={styles.transactions}>
      <div className={styles.category} onClick={(e) => {setOpen(!isOpen)}}>
        <p className={styles.categoryName}>{res}</p>
        <p className={styles.categoryTotal}>Total: ₹{single.total}</p>
        <img src={chevronIcon} alt='>' 
          className={`${styles.icon} ${isOpen && styles.open }`}
        />
      </div>
      <div className={`${styles.transactionBody} ${isOpen && styles.open }`}>
        {transactions.filter((tx) => tx.category === res).map( tx => 
            <TransactionCategory transaction={tx} key={tx.id}/>
        )}
      </div> 
    </ul>
  )
}

export default TransactionList