import React, { useState } from 'react'
import chevronIcon from '../assets/chevronIcon.svg'
import'./DropDown.css'

const DropDown = ({ data, selectedItem, setSelectedItem, children }) => {
    const [isOpen, setOpen] = useState(false);

    const dateCapture = (e, item) => {
      var res = new Date(e.target.value)
      res.setHours(0, 0, 0, 0);

      setSelectedItem({id: item.id, label: res.toLocaleString('default', { month: 'long' }), date: res})

      setOpen(!isOpen); 
    }
    
    return (
      <div className={`dropdown${isOpen ? ' open' : ''}`}>
        <div className='dropdownHeader' onClick={() => setOpen(!isOpen)}>
          {selectedItem && data.find(item => item.id === selectedItem.id) && selectedItem.label}
          <img src={chevronIcon} alt='>' className={`icon ${isOpen && "open"}`}></img>
        </div>
        <div className={`dropdown-body${isOpen ? ' open' : ''}`}>
          {data.map(item => (
            <div className="dropdown-item" 
              onClick={e => {setSelectedItem(item); item.label !=='Custom' && setOpen(!isOpen);
              item.label === 'Custom' && e.currentTarget.querySelector('input').showPicker()}}
              onInputCapture={e => {dateCapture(e, item)}} 
              key={item.id}>
              <span className={`dropdown-item-dot ${item.id === selectedItem.id && 'selected'}`}>• </span>
              {item.label}
              {item.label === 'Custom' && (
                <input className='datePicker' type='month'/>
              )}
            </div>
          ))}
        </div>
      </div>
    )
}

export default DropDown