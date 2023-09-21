import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path={'/'} element={<Login/>}/>
          <Route path={'/dashboard'} element={<Dashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
