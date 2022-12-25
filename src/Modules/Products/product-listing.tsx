import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProdcutListing = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 style={{
        cursor: 'pointer',
        fontWeight: 'bold',
      }} onClick={() => navigate("new")}>Add A product</h1>
    </div>
  )
}

export default ProdcutListing