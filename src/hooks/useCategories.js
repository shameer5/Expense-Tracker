import { useCallback, useEffect, useState } from 'react'

export const useCategories = (transactions, setTotal) => {
    const [results, setResults] = useState([])
  const [categoryTotal, setCategoryTotal] = useState([])

  const findTotal = useCallback((val) => {
      setTotal(0)
      if (!transactions) return
      transactions.forEach(tx => {
        setTotal(prev => prev + (+tx.amount))
        val.push(tx.category)
      })
    },[transactions,setTotal])

    const uniqueCategories = useCallback((val) => {
      val = val.filter((v, i, self) => i === self.indexOf(v))
      setResults(val)
      return val
    }, [])

    const findCategoryTotal = useCallback((val) =>{
      var sum = 0
      var arr =[]
        val.forEach(res => 
          {transactions.filter((tx) => tx.category === res).forEach( tx => {
            sum += +tx.amount
          })
          arr.push({category: res, total: sum})
          sum = 0
          }
          )
          setCategoryTotal([...arr])
    },[transactions]) 

  useEffect(()=>{
    var val = []
    findTotal(val)
    val = uniqueCategories(val)
    findCategoryTotal(val)
  },[findTotal,uniqueCategories,findCategoryTotal])

  return { results, categoryTotal }
}