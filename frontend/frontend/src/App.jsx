import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import NevBar from './component/NevBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<NevBar></NevBar>
      <Outlet></Outlet>
    </>
  )
}

export default App
