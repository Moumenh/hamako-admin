import React from 'react'
import { useNavigate } from 'react-router-dom'

const EditProduct = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1 onClick={() => navigate("/products")}>Edit Product</h1>
    </div>
  )
}

export default EditProduct