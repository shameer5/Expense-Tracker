import styles from './Home.module.css'
import Navbar from "../../compnents/Navbar";
import AddTransaction from './AddTransaction';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useRead } from '../../hooks/useRead';
import TransactionList from './TransactionList';
import { useState } from 'react';
import DropDown from '../../compnents/DropDown';
import { useCategories } from '../../hooks/useCategories';

//setting months array
var currentMonth = new Date()
currentMonth.setHours(0, 0, 0, 0)
var previousMonth = new Date()
previousMonth.setHours(0, 0, 0, 0)
previousMonth.setMonth(previousMonth.getMonth()-1)

const months = [
  {id: 0, label: currentMonth.toLocaleString('default', { month: 'long' })}, 
  {id: 1, label: previousMonth.toLocaleString('default', { month: 'long' })},
  {id: 2, label: 'Custom'}];

const Home = () => {
  const { user } = useAuthContext()
  const [selectedItem, setSelectedItem] = useState(months[0]);
  const [total, setTotal] = useState(0)
  const { stateVal, updateState } = useRead('users', user, currentMonth)
  useCategories(stateVal.documents, setTotal)

  const handleSubmit = (e) =>{
    e.preventDefault()

    if(selectedItem.id === months[0].id)
      updateState(currentMonth)
    
    if(selectedItem.id === months[1].id)
      updateState(previousMonth)  
    
    if(selectedItem.id === months[2].id)
      updateState(selectedItem.date)  
  }

  return (
    <>
    <Navbar />
    <div className={styles.container}>
      <div className={styles.content}>
        {stateVal.error && <p>{stateVal.error}</p>}
        <div className={styles.listHeader}>
          <h3>{`Total expenditure : ₹${total}`}</h3>
          <form onSubmit={handleSubmit}>
            <DropDown data={months} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            <button>Run</button>
          </form>
        </div>
        {stateVal.documents && (
        <>
          <TransactionList transactions={stateVal.documents} total={total} setTotal={setTotal} />
        </>)}
        {stateVal.empty && <p>Start adding your transactions!</p>}
        {stateVal.isPending && <p>Loading</p>}
      </div>
      <div className={styles.sidePanel}>
        <AddTransaction uid={user.uid} />
      </div>
    </div>
    </>
  )
}

export default Home