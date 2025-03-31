import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ManageProductRoutes from './routes/ProductManagement/ProductManagement'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='product-management/*' element={<ManageProductRoutes />}></Route>
    </Routes>
  )
}

export default App
