import { useEffect, useState } from "react"
import DropDown from "../../compnents/DropDown"
import { useWrite } from "../../hooks/useWrite"
import styles from './Home.module.css'

const categories = [
    {id: 0, label:'Food'},
    {id: 1, label:'Travel'},
    {id: 2, label:'Shopping'},
    {id: 3, label:'Household'},
    {id: 4, label:'Housing'},
  ]

const AddTransaction = ({uid}) => {
    const[name, setName] = useState('')
    const[amount, setAmount] = useState('')
    const[date, setDate] = useState('')
    const{ addDocuments, stateVal } = useWrite('users')
    const [selectedItem, setSelectedItem] = useState(categories[0]);


    const handleSubmit = (e) =>{
        var res = new Date(date)
        res.setHours(0, 0, 0, 0);

        e.preventDefault()
        addDocuments({
            uid: uid,
            name: name,
            amount: amount,
            category: selectedItem.label,
            createdAt: res
        })
    }

    useEffect(()=>{
        if(stateVal.success){
            setName('')
            setAmount('')
            setSelectedItem(categories[0])
            setDate('')
        }
    },[stateVal.success])

  return (
    <>
        <h3>Add your Transaction</h3>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Transaction Name:</span>
                <input 
                    type="text"
                    required
                    onChange={e => setName(e.target.value)} 
                    value={name}
                />
            </label>
            <label>
                <span>Amount (₹):</span>
                <input 
                    type="number"
                    required
                    onChange={e => setAmount(e.target.value)} 
                    value={amount}
                />
            </label>
            <label>
                <span>Date :</span>
                <input 
                    type="date"
                    required
                    onChange={e => setDate(e.target.value)}
                    onClick={e => e.currentTarget.showPicker()} 
                    value={date}
                />
            </label>
            <label>
                <div className={styles.sidePanelCategory}>Category:</div>
                <DropDown data={categories} selectedItem={selectedItem} setSelectedItem={setSelectedItem}/>
            </label>
            {!stateVal.isPending && <button>Add Transacation</button>}
            {stateVal.isPending && <button disabled>Loading...</button>}
            {stateVal.error && <p>{stateVal.error}</p>}
        </form>
    </>
  )
}

export default AddTransaction